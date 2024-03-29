import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {PuntoSector} from '../../interfaces/PuntoSector.interface';
import {Polygon} from '@agm/core/services/google-maps-types';
import {MapaFuncionesService} from '../../util/mapas-funciones.service';
import {UtilService} from '../../services/util.service';
import 'jquery';
import { Constantes } from '../../util/constantes';


export declare let google: any;
@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

    ultimoDibujado = new EventEmitter();
    puntosSector: PuntoSector[] = [ ];
    bounds: any;
    @Input("lat") lat: number;
    @Input("lng") lng: number;
    @Input("controls") controls: any[];
    @Output() idle = new EventEmitter();

    map: any;
    drawingManager: any;

    polygons = [];
    dibujos: Polygon[] = [];

    intentoCargaMapa = 0;
    constructor(private _mapaUtil: MapaFuncionesService,
                private  _utilService: UtilService) {
    }

    ngOnInit() {
        this.iniciarCargaMapa();
    }
    addDibujo(puntos: PuntoSector[], color:string ='#FF0000', label = null){
        let dibujoSector = new google.maps.Polygon({
            paths: puntos,
            strokeColor: color,
            strokeOpacity: 0.3,
            strokeWeight: 1.5,
            fillColor: color,
            fillOpacity: 0.25
        });
        dibujoSector.setMap(this.map);
        this.dibujos.push(dibujoSector);

        this.posicionarMapaSegunFigura();
        if(label){
            this.addLabel(puntos, label);
        }

    }
    addLabel(puntos, texto: string){
        let bounds = this.obtenerBounds(puntos);
        this.dibujarLabel(texto, bounds.getCenter());
    }


    iniciarCargaMapa(){

        setTimeout( () => {

            if(google !== undefined){
                this.cargarMapa();
            }else{
                if(this.intentoCargaMapa < 10){
                    this.intentoCargaMapa ++;
                    setTimeout(() => {
                        this.iniciarCargaMapa();
                    }, 2000);
                }
            }
        }, 3000);
    }
    cargarMapa(){
        let polygon1 = {
            draggable: true,
            editable: true,
            fillColor: "#f00"
        };

        this.lat = this.lat ? this.lat : -5.1843741;
        this.lng = this.lng ? this.lng : -80.6431596;

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: this.lat, lng: this.lng},
            zoom: 15,
            mapTypeControl : false
        });

        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            polygonOptions: polygon1,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            }
        });
        this.bounds =  new google.maps.LatLngBounds();

        let self = this;
        google.maps.event.addListener(this.map, 'idle', function(event: any) {
            let centro = self.map.getCenter();
            let center = { lat : centro.lat(), lng : centro.lng()}

            self.idle.emit(center);
        });
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event: any) {


            let puntos = event.overlay.getPath().getArray();

            let puntosSector = [];
            let i;
            let boundsGeneral = self.obtenerBoundPrincipal();
            let fueraArea = false;

           
                for ( i= 0; i<puntos.length; i++) {
                    let punto = puntos[i];
                    puntosSector.push({
                        orden : i,
                        lat : (punto.lat()),
                        lng : (punto.lng())
                    });
    
                    let pointLatn = new google.maps.LatLng(punto.lat(),punto.lng());
                    if(boundsGeneral && !self._mapaUtil.pointContainsBounds(pointLatn, boundsGeneral)){
                        fueraArea = true;
                    }
                }
                       
            
            let ultimoPunto: PuntoSector = {orden: i, lat: puntosSector[0].lat, lng: puntosSector[0].lng}
            puntosSector.push(ultimoPunto);

            event.overlay.setMap(null);

            if (fueraArea){
                self._utilService.alertMensaje("Sector dibujado se encuentra fuera de la jurisdiccion, Intente de nuevo")
            } else{
                self.ultimoDibujado.emit(puntosSector);
                self.addDibujo(puntosSector);
            }
        });
        this.setControlsButtons();
    }

    setControlsButtons(){
        if(this.controls){
            for(let control of this.controls){
                let pos = this.getPosition(control.pos);
                this.map.controls[pos].push(document.getElementById(control.id));
            }
        }
    }
    getPosition(pos: string){
        switch(pos){ 
            case Constantes.MapPosition.TOP_RIGHT:
                return google.maps.ControlPosition.TOP_RIGHT; 
            case Constantes.MapPosition.TOP_CENTER:
                return google.maps.ControlPosition.TOP_CENTER;
            case Constantes.MapPosition.TOP_LEFT:
                return google.maps.ControlPosition.TOP_LEFT;

            case Constantes.MapPosition.BOTTOM_RIGHT:
                return google.maps.ControlPosition.BOTTOM_RIGHT;    
            case Constantes.MapPosition.BOTTOM_CENTER:
                return google.maps.ControlPosition.BOTTOM_CENTER;
            case Constantes.MapPosition.BOTTOM_LEFT:
                return google.maps.ControlPosition.BOTTOM_LEFT;
              
            case Constantes.MapPosition.LEFT_BOTTOM:
                return google.maps.ControlPosition.LEFT_BOTTOM;
            case Constantes.MapPosition.LEFT_CENTER:
                return google.maps.ControlPosition.LEFT_CENTER;
            case Constantes.MapPosition.LEFT_TOP:
                return google.maps.ControlPosition.LEFT_TOP;

            case Constantes.MapPosition.RIGHT_BOTTOM:
                return google.maps.ControlPosition.RIGHT_BOTTOM;
            case Constantes.MapPosition.RIGHT_CENTER:
                return google.maps.ControlPosition.RIGHT_CENTER;
            case Constantes.MapPosition.RIGHT_TOP:
                return google.maps.ControlPosition.RIGHT_TOP;
        }
    }

    addMarker(lat: number, lng: number, icono: string){
        let icon;

        switch(icono){
            case 'Alerta Muni': 
                            icon = "/assets/img/markergreen.png";break;
            default: 
                            icon = "/assets/img/markergreen.png";break;
        }
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng( lat, lng),
            map: this.map,
            icon: icon,
            title: 'Hello World!'
        });
        console.log(lat + ", " + lng);
    }
    obtenerBoundPrincipal(){

        if(this.dibujos.length == 0){
            return null;
        }
        let dibujo: any = this.dibujos[0];
        let puntos = dibujo.getPath().getArray();

        let bounds =  new google.maps.LatLngBounds();

        for(let j = 0; j< puntos.length; j++){
            let punto = puntos[j];
            bounds.extend(new google.maps.LatLng(punto.lat(), punto.lng()))
        }
        return bounds;
    }
    obtenerBounds(puntos){
        let bounds =  new google.maps.LatLngBounds();

        for(let j = 0; j< puntos.length; j++){
            let punto = puntos[j];
            bounds.extend(new google.maps.LatLng(punto.lat, punto.lng))
        }
        return bounds;
    }

    deshabilitarDibujoMapa(){
        if(this.drawingManager){
            this.drawingManager.setMap(null);
        }
    }
    habiliarDibujoMapa(){
        this.drawingManager.setMap(this.map);
    }
    posicionarMapaSegunFigura(){

        if( this.map != null && this.dibujos.length != 0){
            this.bounds =  new google.maps.LatLngBounds();
            //let dibujo: Polygon;
           
            let i;
            for(let i = 0; i< this.dibujos.length; i++){

                let dibujo: any = this.dibujos[i];
                let puntos = dibujo.getPath().getArray();

                for(let j = 0; j< puntos.length; j++){
                    let punto = puntos[j];
                    this.bounds.extend(new google.maps.LatLng(punto.lat(), punto.lng()))
                }
            }
            this.map.fitBounds(this.bounds);
            this.map.setCenter(this.bounds.getCenter());
        }
    }
    borrarDibujos(){

        if( this.map != null && this.dibujos.length != 0){
            this.bounds = null;

            for(let i = 0; i< this.dibujos.length; i++){

                let dibujo: Polygon = this.dibujos[i];
                dibujo.setPath(null);
                dibujo.setMap(null);
                dibujo = null;
            }
            this.dibujos = [];
        }
    }
    dibujarLabel(text: string, pos){

        function   LabelOverlay(args){
            this._args = args;
            this._div = null;

            if (args.minBoxH && args.minBoxW && !args.minBox){
                args.minBox = this._buildBox(args.ll, args.minBoxW, args.minBoxH);
            }

            if (args.maxBoxH && args.maxBoxW && !args.maxBox){
                args.maxBox = this._buildBox(args.ll, args.maxBoxW, args.maxBoxH);
            }

            this.setMap(args.map);
        }

        LabelOverlay.prototype = new google.maps.OverlayView();

        LabelOverlay.prototype._buildBox = function(ll, w, h){
            const box_sw = new google.maps.LatLng(ll.lat() - (h / 2), ll.lng() - (w / 2));
            const box_ne = new google.maps.LatLng(ll.lat() + (h / 2), ll.lng() + (w / 2));
            return new google.maps.LatLngBounds(box_sw, box_ne);
        }

        LabelOverlay.prototype.onAdd = function(){
            let cls = 'gmaps-label';
            if (this._args.className) cls += ' '+this._args.className;

            const div = document.createElement('div');
            div.className = cls;
            if (this._args.labelElement) {
                div.appendChild(this._args.labelElement);
            } else {
                div.innerHTML = this._args.label;
            }

            this._div = div;

            const panes = this.getPanes();
            panes.overlayImage.appendChild(div);

            if (this._args.minBox && this._args.debugBoxes){
                this._minBox = new google.maps.Rectangle({
                    strokeWeight: 0,
                    fillColor: "#0000FF",
                    fillOpacity: 0.35,
                    map: this._args.map,
                    bounds: this._args.minBox
                });
            }
            if (this._args.maxBox && this._args.debugBoxes){
                this._maxBox = new google.maps.Rectangle({
                    strokeWeight: 0,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    map: this._args.map,
                    bounds: this._args.maxBox
                });
            }
        }

        LabelOverlay.prototype.draw = function(){

            const proj = this.getProjection();
            const zoom = this._args.map.getZoom();
            const xy = proj.fromLatLngToDivPixel(this._args.ll);

            // label size is needed for a few things
            const div = this._div;
            const w = $(div).width();
            const h = $(div).height();

            // decide if we should show the label.
            // if nothing else is specifed, always show it
            let can_show = true;

            // min/max zoom levels
            if (this._args.maxZoom && zoom > this._args.maxZoom) can_show = false;
            if (this._args.minZoom && zoom < this._args.minZoom) can_show = false;

            // bounding box?
            if (this._args.minBox){
                let ne = proj.fromLatLngToDivPixel(this._args.minBox.getNorthEast());
                let sw = proj.fromLatLngToDivPixel(this._args.minBox.getSouthWest());

                let l = Math.abs(xy.x - ne.x);
                let r = Math.abs(xy.x - sw.x);
                let t = Math.abs(xy.y - ne.y);
                let b = Math.abs(xy.y - sw.y);

                if (l < w/2) can_show = false;
                if (r < w/2) can_show = false;
                if (t < h/2) can_show = false;
                if (b < h/2) can_show = false;
            }

            if (this._args.maxBox){
                let ne = proj.fromLatLngToDivPixel(this._args.maxBox.getNorthEast());
                let sw = proj.fromLatLngToDivPixel(this._args.maxBox.getSouthWest());

                let l = Math.abs(xy.x - ne.x);
                let r = Math.abs(xy.x - sw.x);
                let t = Math.abs(xy.y - ne.y);
                let b = Math.abs(xy.y - sw.y);

                if (l > w/2) can_show = false;
                if (r > w/2) can_show = false;
                if (t > h/2) can_show = false;
                if (b > h/2) can_show = false;
            }

            // show/hide
            if (this._args.debugVisibility){
                div.style.visibility = 'visible';
                div.style.color = can_show ? 'white' : 'red';
            }else{
                div.style.visibility = can_show ? 'visible' : 'hidden';
                if (!can_show) return;
            }

            // position
            div.style.left = (xy.x - (w/2)) + 'px';
            div.style.top = (xy.y - (h/2)) + 'px';
        }

        LabelOverlay.prototype.onRemove = function() {
            this._div.parentNode.removeChild(this._div);
            this._div = null;

            if (this._minBox){}
            if (this._maxBox){}
        }

        let overlay1 = new LabelOverlay({
            ll		: pos,

            minBoxH		: 0.346,
            minBoxW		: 1.121,

            maxBoxH		: 0.09,
            maxBoxW		: 0.3,

            debugBoxes	: false,
            debugVisibility	: true,

            maxZoom		: 0,
            minZoom		: 0,
            label		: text,
            map		: this.map
        });
    }
}

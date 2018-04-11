import {Component, EventEmitter, OnInit} from '@angular/core';
import { TipoSectorService } from '../../../services/tipo-sector.service';
import { TipoSector } from '../../../interfaces/TipoSector.interface';
import { SectorService } from '../../../services/sector.service';
import { UtilService } from '../../../services/util.service';
import { Sector } from '../../../interfaces/sector.interface';
import { LatLngLiteral } from '@agm/core';
import { PuntoSector } from '../../../interfaces/PuntoSector.interface';
import { MapaFuncionesService } from '../../../util/mapas-funciones.service';

declare var google: any;
@Component({
    selector: 'app-sector-formulario',
    templateUrl: './sector-formulario.component.html',
    styleUrls: ['./sector-formulario.component.css']
})
export class SectorFormularioComponent implements OnInit {
  

    sectorInicial: Sector = {
        nombre: ""
    };
    ultimoGuardado = new EventEmitter();

    controls = true;
    buttons = {
        nuevo: false,
        modificar: false,
        guardar: false,
        cancelar: false,
        imprimir: false,
        eliminar: false,
        ver: false
    } ;
    tabActual = 0;
    dibujoSector: any;
    puntosSector: PuntoSector[] = [ ];
    bounds: any;

    hayDibujoJurisdiccion = false;
    figuraJursdiccion : any = null;

    map: any;
    drawingManager: any;
    polygons = [];

    lat = 24.886;
    lng = -70.268;

   
    zoom: number = 10;
    
    tiposSector: TipoSector[] = [];
    constructor(private _tipoSectorService: TipoSectorService,
                private _sectorService: SectorService,
                private _mapaFunciones: MapaFuncionesService,
                private _utilService: UtilService){

        this._tipoSectorService.listar().subscribe(
            data => {
                if(data.success){
                    this.tiposSector = data.data;
                }
            }, err => {
                console.error(err);
            }
        );
        //this.reiniciarFormulario();
    }
    reiniciarFormulario(){
        this.sectorInicial = {};
        this.deshabilitarDibujoMapa();
        this.reiniciarMapa();
    }

    ngOnInit() {
        this.iniciarCargaMapa();
        
    }  
    nuevo (){
        this.habiliarDibujoMapa();
        this.controls = true;
    }

    iniciarCargaMapa(){       

        setTimeout( () => {
           
            if(google !== undefined){
               // console.log(google);
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

    intentoCargaMapa = 0;

    traerSector(id: number){
    
       this._utilService.showLoading();
        this._sectorService.leerJurisdiccion(id).subscribe(
            data => {
                this.llenarCampos(data.data);
                this._utilService.hideLoading();
            }, err => {
                console.log(err);
                this._utilService.hideLoading();
            }
        );
    }
    llenarCampos(sector: Sector){
        this.sectorInicial = sector;
        this.controls = false;

        this.dibujarFigura(this.sectorInicial.puntoSector);
        this.deshabilitarDibujoMapa();
    }

    dibujarFigura(puntos: PuntoSector[]){
        this.puntosSector = puntos;
        this.dibujoSector.setMap(null);
        if(puntos == null){
            this.reiniciarMapa();
            return;
        }
        this.hayDibujoJurisdiccion = true;
        this.dibujoSector.setPath(puntos);
        this.dibujoSector.setMap(this.map);
        this.posicionarMapaSegunFigura();
    }


    cargarMapa(){
        let polygon1 = {
            draggable: true,
            editable: true,
            fillColor: "#f00"
        };
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat:-5.1843741, lng: -80.6431596 },
            zoom: 15
        });

        
        this.dibujoSector = new google.maps.Polygon({
            paths: [],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
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

        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event: any) {
           
            let i = 0;
            let puntos = event.overlay.getPath().getArray();
            
            self.puntosSector = [];
            
            for (let punto of puntos) {
                self.puntosSector.push({
                    orden : i,
                    lat : (punto.lat()),
                    lng : (punto.lng())
                });
                i++;
            }
            self.hayDibujoJurisdiccion = true;
            let ultimoPunto: PuntoSector = {orden: i, lat: self.puntosSector[0].lat, lng: self.puntosSector[0].lng}
            self.puntosSector.push(ultimoPunto);
            self.sectorInicial.puntoSector = self.puntosSector;

            self.figuraJursdiccion = event.overlay;
            self.deshabilitarDibujoMapa();
          });

          this.reiniciarMapa();
    }
    deshabilitarDibujoMapa(){
        if(this.drawingManager){
            this.drawingManager.setMap(null);
        }
    }
    habiliarDibujoMapa(){
        this.drawingManager.setMap(this.map);   
    }
    reiniciarMapa(){
        this.hayDibujoJurisdiccion = false;
        if (this.figuraJursdiccion){
            this.figuraJursdiccion.setMap(null);
        }
        this.deshabilitarDibujoMapa();
        if(this.dibujoSector){
            this.dibujoSector.setMap(null);
        }   
    }
    reiniciarDibujo(){
        this.hayDibujoJurisdiccion = false;
        if (this.figuraJursdiccion){
            this.figuraJursdiccion.setMap(null);
        }
       this.habiliarDibujoMapa();
        if(this.dibujoSector){
            this.dibujoSector.setMap(null);
        }   
    }

    posicionarMapaSegunFigura(){
        let i;

        if(this.bounds != null && this.map != null && this.puntosSector.length != 0){
            this.bounds = this.bounds =  new google.maps.LatLngBounds();
            for(let punto of this.puntosSector){
                this.bounds.extend(new google.maps.LatLng(punto.lat, punto.lng))
            }
            this.map.fitBounds(this.bounds);
            this.map.setCenter(this.bounds.getCenter());
        }
    }

    guardar(){
        this.sectorInicial.IdTipoSector = 1;

        if(this.validarFormulario()){
            this._utilService.showLoading();
            this._sectorService.guardar(this.sectorInicial).subscribe(
                data => {
                    if(data.success){
                        this._utilService.hideLoading();
                        this._utilService.alertMensaje("Sector guardado correctamente");
                        this.reiniciarFormulario();
                        setTimeout(()=>{
                            this.ultimoGuardado.emit(data.data);
                        },500)
                    }
                    console.log(data)
                }, err => {
                    console.log(err)
                }
            );
        }
    }
    cambio(event: any){
        switch (event.index) {
            case 0:
              break;
            case 1:
              if(!this.hayDibujoJurisdiccion){
                  this._utilService.alertMensaje("Debe dibujar el sector de una jurisdiccion para ver o definir secciones");
                  this.tabActual = 0;
              }
              break;
          }
    }

    validarFormulario(){
        if(this.sectorInicial.nombre == null || this.sectorInicial.nombre == ''){
            this._utilService.alertMensaje("Debe ingresar un nombre");
            return false;
        }
        if(this.sectorInicial.puntoSector == null || this.sectorInicial.puntoSector.length == 0){
            this._utilService.alertMensaje("Debe dibujar un sector");
            return false;
        }
        return true;
    }

    cancelar(){
        this.reiniciarFormulario();
    }
}

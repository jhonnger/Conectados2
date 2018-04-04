import {Component, OnInit} from '@angular/core';
import { TipoSectorService } from '../../../services/tipo-sector.service';
import { TipoSector } from '../../../interfaces/TipoSector.interface';
import { SectorService } from '../../../services/sector.service';
import { UtilService } from '../../../services/util.service';
import { Sector } from '../../../interfaces/sector.interface';
import { LatLngLiteral } from '@agm/core';
import {} from '@types/googlemaps';

declare var google: any;
@Component({
    selector: 'app-sector-formulario',
    templateUrl: './sector-formulario.component.html',
    styleUrls: ['./sector-formulario.component.css']
})
export class SectorFormularioComponent implements OnInit {
  

    sectorInicial: Sector = {
        nombre: "",
        tipoSector: {}
    };

    map: any;
    drawingManager: any;
    polygons = [];

    lat = 40.7786232;
    lng = -74.0007019;

   
    zoom: number = 10;
    paths: Array<LatLngLiteral> = [
      { lat: 0,  lng: 10 },
      { lat: 0,  lng: 20 },
      { lat: 10, lng: 20 },
      { lat: 10, lng: 10 },
      { lat: 0,  lng: 10 }
    ]
    tiposSector: TipoSector[] = [];
    constructor(private _tipoSectorService: TipoSectorService,
                private _sectorService: SectorService,
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
    }
    ngOnInit() {
        this.iniciarCargaMapa();
        
    }  
    iniciarCargaMapa(){
        console.log("holi");
       

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

    llenarCampos(id: number){
        this._utilService.showLoading();
        this._sectorService.leer(id).subscribe(
            data => {
                console.log(data.data);
                this.sectorInicial = data.data;
                this._utilService.hideLoading();
            }, err => {
                console.log(err);
                this._utilService.hideLoading();
            }
        );
        
    }
    cargarMapa(){
        var polygon1 = {
            draggable: true,
            editable: true,
            fillColor: "#f00"
        };
        var rect1 = {
            draggable: true,
            editable: true,
            fillColor: "#0f0"
        };
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 17.4471, lng: 78.454 },
            zoom: 10
        });

        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            polygonOptions: polygon1,
            rectangleOptions: rect1,
            
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon', 'rectangle']
            }
        });

        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event: any) {
            console.log(event);
            console.log(event.type);
            console.log(event.overlay);
            console.log(event.overlay.getPath());
            console.log(event.overlay.getPath().getArray());
            if (event.type == 'circle') {
              var radius = event.overlay.getRadius();
            }
            
          });

        this.drawingManager.setMap(this.map);
    }
    
}

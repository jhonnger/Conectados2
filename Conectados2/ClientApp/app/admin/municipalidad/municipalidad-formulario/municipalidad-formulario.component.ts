import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { MunicipalidadService } from '../../../services/municipalidad.service';
import { Municipalidad } from '../../../interfaces/Municipalidad.interface';
import { TipoMuniService } from '../../../services/tipo-muni.service';
import { TipoMunicipalidad } from '../../../interfaces/TipoMunicipalidad.interface';
import {Sector} from '../../../interfaces/Sector.interface';
import {SectorBuscadorModalComponent} from '../../sector/sector-buscador-modal/sector-buscador-modal.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UtilService} from '../../../services/util.service';
import {SectorService} from '../../../services/sector.service';
import {SectorFormularioModalComponent} from "../../sector/sector-formulario-modal/sector-formulario-modal.component";
import { Constantes } from '../../../util/constantes';
import { MapaComponent } from '../../../components/mapa/mapa.component';
import { TipoSectorService } from '../../../services/tipo-sector.service';

@Component({
    selector: 'app-municipalidad-formulario',
    templateUrl: './municipalidad-formulario.component.html',
    styleUrls: ['./municipalidad-formulario.component.css']
})
export class MunicipalidadFormularioComponent implements OnInit {

    
    @ViewChild('mapa') mapa: MapaComponent;
    
    nombreTipoJurisdiccion = 'Jurisdiccion';
    idTipoJurisdiccion: number;
    municipalidad: Municipalidad = { ubicacion: {}};
    jurisdiccion: Sector = {};
    tiposMuni: TipoMunicipalidad[] = [];
    ultimoGuardado = new EventEmitter();
    controls = true;
    editarUbicacion = false;
    controlsMap = [
        { id : 'editPos', pos : Constantes.MapPosition.TOP_LEFT },
        { id : 'editJuris', pos : Constantes.MapPosition.TOP_LEFT },
    ];

    constructor(private _municipalidadService: MunicipalidadService,
                private dialog: MatDialog,
                private _sectorService: SectorService,
                private _utilService: UtilService,
                private _tipoSectorService: TipoSectorService,
                private _tipoMuniService: TipoMuniService) {


                    this._tipoMuniService.listar().subscribe(
                        data => {
                            if(data.success){
                                this.tiposMuni = data.data;
                            }
                            console.log(this.tiposMuni);
                        }, err => {

                        }
                    );
                 }

    ngOnInit() {
        this.mapa.ultimoDibujado.subscribe(
            data => {
                if(!this.municipalidad.idSectorNavigation){
                    this.municipalidad.idSectorNavigation = {}
                }
                this.municipalidad.idSectorNavigation.puntoSector = data;
                this.mapa.deshabilitarDibujoMapa();
            },
            err => {

            }
        );
        this._tipoSectorService.listar().subscribe(
            data => {
                if(data.success){
                    this.buscarIdJurisdiccion(data.data);
                } else{
                    this._utilService.alertMensaje('Error al cargar la página');
                }
            }
        );
    }
    dibujarJurisdiccion(){
        this.mapa.borrarDibujos();
        this.mapa.habiliarDibujoMapa();
    }

    traerMunicipalidad(id: number){
        this._utilService.showLoading();
        this._municipalidadService.leer(id).subscribe(
            data => {
                this._utilService.hideLoading();
                if(data.success){
                    this.municipalidad = data.data;
                    this.jurisdiccion = data.data.idSectorNavigation;
                    this.mapa.borrarDibujos();
                    this.mapa.deshabilitarDibujoMapa();
                    this.mapa.addDibujo(this.jurisdiccion.puntoSector)
                }
            },
            err => {
                this._utilService.hideLoading();
            }
        );
    }

    reiniciarFormulario(){
        this.municipalidad = { ubicacion:{}};
        this.jurisdiccion = {};
        this.controls = false;
        this.mapa.deshabilitarDibujoMapa();
        this.mapa.borrarDibujos();
    }
    guardar(){
        if(this.validarFormulario()){
            this.municipalidad.idSector = this.jurisdiccion.idSector;
            if(!this.municipalidad.idSectorNavigation.nombre){
                this.municipalidad.idSectorNavigation.nombre = this.municipalidad.nombre;
            }
            this.municipalidad.idSectorNavigation.IdTipoSector = this.idTipoJurisdiccion;
            this._utilService.showLoading();
            this._municipalidadService.guardar(this.municipalidad).subscribe(
                data => {
                    if(data.success){
                        this._utilService.hideLoading();
                        this._utilService.alertMensaje("Entidad guardado correctamente");
                        this.reiniciarFormulario();
                        
                        this.ultimoGuardado.emit(data.data);
                        
                    }
                }, err => {
                    console.log(err)
                }
            );
        }
    }
    buscarIdJurisdiccion(tiposSector){
        for(let tipoSector of tiposSector){
            if(tipoSector.nombre == this.nombreTipoJurisdiccion){
                this.idTipoJurisdiccion = tipoSector.idTipoSector;
                return;
            }
        }
    }
    validarFormulario(){
        if(!this.municipalidad.nombre){
            this._utilService.alertMensaje("Debe escribir el nombre de la entidad");
            return false;
        }
        if(!this.municipalidad.idTipoComiMuni){
            this._utilService.alertMensaje("Elija el tipo de entidad");
            return false;
        }
        if(!this.municipalidad.idSectorNavigation){
            this._utilService.alertMensaje("Debe establecer a qué jurisdiccion pertenece");
        }
        return true;
    }
    geoDecoder(lat: number, lng: number){
      
        let latlng = new google.maps.LatLng(lat, lng);
        let request = {
            latLng: latlng
        };
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode(request, (results: any, status: any) => {
            let direccion = "";
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0] != null) {

                  direccion = results[0].formatted_address;                    
                } else {
                    direccion = "";
                }
            }
            this.municipalidad.ubicacion.descripcion = direccion;
        });
    }
    idleFunction(center: any){
      if(this.editarUbicacion){
          this.municipalidad.ubicacion.latitud = center.lat;
          this.municipalidad.ubicacion.longitud = center.lng;
        this.geoDecoder(center.lat, center.lng);
      }
    }
}


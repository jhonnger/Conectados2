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

@Component({
    selector: 'app-municipalidad-formulario',
    templateUrl: './municipalidad-formulario.component.html',
    styleUrls: ['./municipalidad-formulario.component.css']
})
export class MunicipalidadFormularioComponent implements OnInit {


    dialogRef: MatDialogRef<SectorBuscadorModalComponent>;
    dialogModalFormulario: MatDialogRef<SectorFormularioModalComponent>;
    @ViewChild('mapaMuni') mapMuni: any;
    municipalidad: Municipalidad = { ubicacion: {}};
    jurisdiccion: Sector = {};
    tiposMuni: TipoMunicipalidad[] = [];
    ultimoGuardado = new EventEmitter();
    controls = true;
    editarUbicacion = false;
    zoom = 15;

    constructor(private _municipalidadService: MunicipalidadService,
                private dialog: MatDialog,
                private _sectorService: SectorService,
                private _utilService: UtilService,
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
      
    }
    abrirModalBuscarJurisdiccion(){
        this.dialogRef = this.dialog.open(SectorBuscadorModalComponent, {
            width: '80%',
            panelClass: 'buscador'
        });

        const sub =  this.dialogRef.componentInstance.onAdd.subscribe((result) => {
            this.traerJurisdiccion(result);
            this.dialogRef.close();
        });
    }
    traerJurisdiccion(id){
        this._utilService.showLoading();
        this._sectorService.leerJurisdiccion(id).subscribe(
            response =>{
                this._utilService.hideLoading();
                this.jurisdiccion = response.data;
            },
            err => {
                this._utilService.hideLoading();
            }
        );
    }

    abrirModalFormularioJurisdicion(){
        this.dialogModalFormulario = this.dialog.open(SectorFormularioModalComponent, {
            width: '80%'
        });

        this.dialogModalFormulario.componentInstance.onAdd.subscribe(
            response => {
                this.jurisdiccion = response.data;

                this.dialogModalFormulario.close();
            }, err => {

            }
        );
    }

    traerMunicipalidad(id: number){
        this._utilService.showLoading();
        this._municipalidadService.leer(id).subscribe(
            data => {
                this._utilService.hideLoading();
                if(data.success){
                    this.municipalidad = data.data;
                    this.jurisdiccion = data.data.idSectorNavigation;
                    this.zoom = 15;
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
    }
    guardar(){
        if(this.validarFormulario()){
            let lat = this.mapMuni.latitude;
            let lng = this.mapMuni.longitude;

            this.municipalidad.ubicacion.latitud = lat;
            this.municipalidad.ubicacion.longitud = lng;
            this.municipalidad.idSector = this.jurisdiccion.idSector;
            this._utilService.showLoading();
            this._municipalidadService.guardar(this.municipalidad).subscribe(
                data => {
                    if(data.success){
                        this._utilService.hideLoading();
                        this._utilService.alertMensaje("Entidad guardado correctamente");
                        this.reiniciarFormulario();
                        
                        this.ultimoGuardado.emit(data.data);
                        
                    }
                    console.log(data)
                }, err => {
                    console.log(err)
                }
            );
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
        if(!this.jurisdiccion.idSector){
            this._utilService.alertMensaje("Debe establecer a qué jurisdiccion pertenece");
        }
        return true;
    }
    mapReady(event: any) {
        let map = event;
       
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('editPos'));
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
    idleFunction(){
      
        let lat = this.mapMuni.latitude;
        let lng = this.mapMuni.longitude;
        
        this.geoDecoder(lat, lng);
      }
}


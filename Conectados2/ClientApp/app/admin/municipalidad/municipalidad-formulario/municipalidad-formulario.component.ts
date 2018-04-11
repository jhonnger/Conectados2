import {Component, OnInit} from '@angular/core';
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
    municipalidad: Municipalidad = {nombre: 'uno', tipoComiMuni:{}};
    jurisdiccion: Sector = {};
    tiposMuni: TipoMunicipalidad[] = [];

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
            width: '80%'
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
}


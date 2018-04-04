import {Component, OnInit} from '@angular/core';
import { MunicipalidadService } from '../../../services/municipalidad.service';
import { Municipalidad } from '../../../interfaces/Municipalidad.interface';
import { TipoMuniService } from '../../../services/tipo-muni.service';
import { TipoMunicipalidad } from '../../../interfaces/TipoMunicipalidad.interface';

@Component({
    selector: 'app-municipalidad-formulario',
    templateUrl: './municipalidad-formulario.component.html',
    styleUrls: ['./municipalidad-formulario.component.css']
})
export class MunicipalidadFormularioComponent implements OnInit {
  
    
    
    municipalidad: Municipalidad = {nombre: 'uno', tipoComiMuni:{}};
    tiposMuni: TipoMunicipalidad[] = [];
    constructor(private _municipalidadService: MunicipalidadService,
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
}


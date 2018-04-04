import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MunicipalidadService } from '../../../services/municipalidad.service';
import { Municipalidad } from '../../../interfaces/Municipalidad.interface';

@Component({
    selector: 'app-municipalidad-buscador',
    templateUrl: './municipalidad-buscador.component.html',
    styleUrls: ['./municipalidad-buscador.component.css']
})
export class MunicipalidadBuscadorComponent implements OnInit {
  
    @Output() seleccionaFila = new EventEmitter<string>();
    displayedColumns = ['pos', 'nombre','tipo'];
    municipalidades: Municipalidad[] = [{nombre: 'uno', tipoComiMuni:{}}];
    dataSource = new MatTableDataSource(this.municipalidades);
    constructor(private _municipalidadService: MunicipalidadService) { }


    selecciona(id: any){
      
      this.seleccionaFila.emit(id);
    }
    ngOnInit() {
      this._municipalidadService.listar().subscribe(
        data => {
          if(data.success){
            this.municipalidades = data.data;
              this.dataSource = new MatTableDataSource(this.municipalidades);
          }
          console.log(data);
        }, err => {
          console.error(err);
        }
      );
    }  
 
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        console.log("holi");
      }
}


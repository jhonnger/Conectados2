import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MunicipalidadService } from '../../../services/municipalidad.service';
import { Municipalidad } from '../../../interfaces/Municipalidad.interface';
import { BusquedaPaginada } from '../../../interfaces/BusquedaPaginada.interface';

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
    paginacion: BusquedaPaginada = {
      paginaActual: 1,
      totalPaginas: 1
    };
    constructor(private _municipalidadService: MunicipalidadService) { }
  
    selecciona(id: any){
      
      this.seleccionaFila.emit(id);
    }
    ngOnInit() {
      this.listar();
    }  
    listar(pagina = 1){
      this._municipalidadService.listar().subscribe(
        data => {
          if(data.success){
            let paginacion: BusquedaPaginada = data.data;
            this.municipalidades = paginacion.items;
            this.paginacion.paginaActual = paginacion.paginaActual;
            this.paginacion.totalPaginas = paginacion.totalPaginas;
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


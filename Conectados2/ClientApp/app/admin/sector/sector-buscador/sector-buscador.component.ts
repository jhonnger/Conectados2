import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SectorService } from '../../../services/sector.service';
import { Sector } from '../../../interfaces/sector.interface';
import { MatTableDataSource } from '@angular/material';
import { UtilService } from '../../../services/util.service';
import {BusquedaPaginada} from "../../../interfaces/BusquedaPaginada.interface";

@Component({
    selector: 'app-sector-buscador',
    templateUrl: './sector-buscador.component.html',
    styleUrls: ['./sector-buscador.component.css']
})
export class SectorBuscadorComponent implements OnInit {
  
    @Output() seleccionaFila = new EventEmitter<string>();
    displayedColumns = ['pos', 'nombre','tipo'];
    sectores: Sector[] = [{nombre: '', tipoSector: {}}];
    dataSource = new MatTableDataSource(this.sectores);
    paginacion: BusquedaPaginada = {
        paginaActual: 1,
        totalPaginas: 1
    };
    
    constructor(private _sectorService: SectorService,
                private _utilService: UtilService){

        this.listar();

    }

    ngOnInit() {} 

    listar(pagina: number = 1){
        this._utilService.showLoading();
        this._sectorService.listarJurisdiccion(pagina).subscribe(
            data => {
                this._utilService.hideLoading();
                if(data.success){
                    let paginacion: BusquedaPaginada = data.data;
                    this.sectores = paginacion.items;
                    this.paginacion.paginaActual = paginacion.paginaActual;
                    this.paginacion.totalPaginas = paginacion.totalPaginas;
                    this.dataSource = new MatTableDataSource(this.sectores);
                    console.log(this.paginacion)
                }
            }, err => {
                this._utilService.hideLoading();
            }
        );
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }

      selecciona(id: any){
      
        this.seleccionaFila.emit(id);
      }
      consultar(pagina: number){
          this.listar(pagina);
      }
}

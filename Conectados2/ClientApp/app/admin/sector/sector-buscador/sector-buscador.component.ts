import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SectorService } from '../../../services/sector.service';
import { Sector } from '../../../interfaces/sector.interface';
import { MatTableDataSource } from '@angular/material';

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
    
    constructor(private _sectorService: SectorService){
        this._sectorService.listar().subscribe(
            data => {
                if(data.success){
                    this.sectores = data.data;
                    this.dataSource = new MatTableDataSource(this.sectores);
                }
                console.log(this.sectores);
            }, err => {

            }
        );
    }
    ngOnInit() {} 
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        console.log("holi");
      }

      selecciona(id: any){
      
        this.seleccionaFila.emit(id);
      }
    
}
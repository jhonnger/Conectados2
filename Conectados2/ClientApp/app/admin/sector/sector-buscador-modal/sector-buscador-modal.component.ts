import { Component, OnInit, EventEmitter } from '@angular/core';
import { Sector } from '../../../interfaces/Sector.interface';
import { MatDialog } from '@angular/material';
import { SectorBuscadorComponent } from '../sector-buscador/sector-buscador.component';

@Component({
  selector: 'app-sector-buscador-modal',
  templateUrl: './sector-buscador-modal.component.html',
  styleUrls: ['./sector-buscador-modal.component.css']
})
export class SectorBuscadorModalComponent implements OnInit {

    onAdd = new EventEmitter();

    constructor(public dialog: MatDialog) { }

    ngOnInit() {

    }
    abrirModalBuscarJurisdiccion(){
        let dialogRef = this.dialog.open(SectorBuscadorComponent, {
            width: '80%'
          });
    }
    cerrarModal(event: any){
        this.onAdd.emit(event);
    }
}

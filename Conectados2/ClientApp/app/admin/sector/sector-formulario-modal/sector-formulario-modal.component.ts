import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {SectorFormularioComponent} from '../sector-formulario/sector-formulario.component';

@Component({
    selector: 'app-sector-formulario-modal',
    templateUrl: './sector-formulario-modal.component.html',
    styleUrls: ['./sector-formulario-modal.component.css']
})
export class SectorFormularioModalComponent implements OnInit {

    onAdd = new EventEmitter();
    @ViewChild('sectorFormulario') formulario: SectorFormularioComponent;

    constructor() { }

    ngOnInit() {
        this.formulario.ultimoGuardado.subscribe(
            response => {
                    this.onAdd.emit(response);
            }, err => {

            }
        );
    }

    cerrarModal(event: any){
        this.onAdd.emit(event);
    }

    guardar(){

        this.formulario.guardar();
    }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import { SectorFormularioComponent } from './sector-formulario/sector-formulario.component';

@Component({
    selector: 'app-sector',
    templateUrl: './sector.component.html',
    styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  
    @ViewChild(SectorFormularioComponent)
    private sectorFormularioComponent: SectorFormularioComponent;	

    constructor(){

    }
    ngOnInit() {}  
    
    salida(entrada: number){
        console.log(entrada);
        this.sectorFormularioComponent.llenarCampos(entrada);
    }
    
}

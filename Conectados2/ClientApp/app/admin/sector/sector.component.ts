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
    buttons = {
        nuevo: false,
        modificar: false,
        guardar: false,
        cancelar: false,
        imprimir: false,
        eliminar: false,
        ver: false
    } ;

    constructor(){

    }
    ngOnInit() {
        this.reiniciarBotones();
        this.sectorFormularioComponent.controls = false;
    }
    
    salida(entrada: number){
        console.log(entrada);
        this.sectorFormularioComponent.traerSector(entrada);
        this.modificarBotones(false, false, true, true, true, true, true);
    }

    reiniciarBotones(){
        this.modificarBotones(true, false, false, false, false, false, true)
    }

    modificarBotones(nuevo:boolean, guardar: boolean, modificar: boolean, eliminar: boolean, cancelar: boolean, ver: boolean, imprimir: boolean){
        this.buttons.nuevo = nuevo;
        this.buttons.guardar = guardar;
        this.buttons.modificar = modificar;
        this.buttons.eliminar = eliminar;
        this.buttons.cancelar = cancelar;
        this.buttons.ver = ver;
        this.buttons.imprimir = imprimir;
    }
    nuevo (){
        this.sectorFormularioComponent.nuevo();
        this.modificarBotones(false, true, false, false, true, false, false);
    }
    modificar(){
        this.sectorFormularioComponent.controls = true;
        this.modificarBotones(false, true, false, false, true, false, false)
    }
    cancelar(){
        this.sectorFormularioComponent.reiniciarFormulario();
        this.reiniciarBotones();
    }
    guardar(){
        this.sectorFormularioComponent.guardar();
    }
}

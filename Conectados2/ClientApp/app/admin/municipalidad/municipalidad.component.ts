import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { MunicipalidadFormularioComponent } from './municipalidad-formulario/municipalidad-formulario.component';
import { MunicipalidadBuscadorComponent } from './municipalidad-buscador/municipalidad-buscador.component';



@Component({
    selector: 'app-municipalidad',
    templateUrl: './municipalidad.component.html',
    styleUrls: ['./municipalidad.component.css']
})
export class MunicipalidadComponent implements OnInit {
  
    @ViewChild(MunicipalidadFormularioComponent)
    private municipalidadFormularioComponent: MunicipalidadFormularioComponent;
    @ViewChild(MunicipalidadBuscadorComponent)
    private municipalidadBuscadorComponent: MunicipalidadBuscadorComponent;

    buttons = {
        nuevo: false,
        modificar: false,
        guardar: false,
        cancelar: false,
        imprimir: false,
        eliminar: false,
        ver: false
    } ;

    ngOnInit() {
        this.reiniciarBotones();
        this.municipalidadFormularioComponent.controls = false;
        this.municipalidadFormularioComponent.ultimoGuardado.subscribe(
            data => {
                this.municipalidadBuscadorComponent.listar();
            }
        );
    }  
    
    salida(entrada: any){
        this.modificarBotones(false, false, true, true, true, true, true);
        this.municipalidadFormularioComponent.traerMunicipalidad(entrada);
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
        this.municipalidadFormularioComponent.controls = true;
        this.modificarBotones(false, true, false, false, true, false, false);
    }
    modificar(){
        this.municipalidadFormularioComponent.controls = true;
        this.modificarBotones(false, true, false, false, true, false, false)
    }
    cancelar(){
        this.municipalidadFormularioComponent.reiniciarFormulario();
        this.reiniciarBotones();
    }
    guardar(){
        this.municipalidadFormularioComponent.guardar();
    }
    eliminar(){
        
    }
}

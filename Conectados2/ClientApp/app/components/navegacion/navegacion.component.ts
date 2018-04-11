import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-navegacion',
    templateUrl: './navegacion.component.html',
    styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

    @Output() consultar = new EventEmitter();
    @Input('totalPaginas') totalPaginas: number;
    @Input('paginaActual') paginaActual: number;

    consultarPagina(pagina: number){
    }
    inicio(){
        if(this.paginaActual > 1){
            this.consultarPagina(1);
        }
    }
    ultimo(){
        if(this.paginaActual != this.totalPaginas){
            this.consultarPagina(this.paginaActual + 1);
        }
    }
    siguiente(){
        let page = this.paginaActual + 1;

        if(page <= this.totalPaginas){
            this.consultarPagina(page);
        }
    }
    anterior(){
        let page = this.paginaActual - 1;

        if(page >= 1){
            this.consultarPagina(page);
        }
    }

}

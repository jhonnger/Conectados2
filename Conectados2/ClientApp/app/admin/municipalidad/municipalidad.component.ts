import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';



@Component({
    selector: 'app-municipalidad',
    templateUrl: './municipalidad.component.html',
    styleUrls: ['./municipalidad.component.css']
})
export class MunicipalidadComponent implements OnInit {
  
    

    ngOnInit() {}  
    
    salida(entrada: any){
        console.log(entrada);
    }
    
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';



@Component({
    selector: 'app-municipalidad',
    templateUrl: './municipalidad.component.html',
    styleUrls: ['./municipalidad.component.css']
})
export class MunicipalidadComponent implements OnInit {
  
    constructor() { }

    ngOnInit() {}  
    /**
     * Set the sort after the view init since this component will
     * be able to query its view for the initialized sort.
     */
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        
      }
}


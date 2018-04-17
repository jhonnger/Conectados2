import {Component, OnInit, ViewChild} from '@angular/core';
import {AgmMap} from '@agm/core';
import {MatDialog} from '@angular/material';
import {NuevocasoComponent} from '../nuevocaso/nuevocaso.component';
import { Municipalidad } from '../../interfaces/Municipalidad.interface';
import { MapaComponent } from '../../components/mapa/mapa.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('mapMonitoreo') mapMonitoreo: AgmMap;
  @ViewChild('mapUnidades') mapUnidades: AgmMap;
  @ViewChild('mapa') mapa: MapaComponent;
  sectorDibujado = false;
  lat = 40.7786232;
  lng = -74.0007019;
  municipalidad: Municipalidad = {
    ubicacion : {
      latitud : this.lat,
      longitud: this.lng
    }
  }
  constructor(public dialog: MatDialog) {
    let municipalidad = JSON.parse(localStorage.getItem('municipalidad'));
    if(municipalidad){
      this.municipalidad = municipalidad;
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(NuevocasoComponent, {
      id: "nuevoCaso",
      width: '650px',
      disableClose: true,
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  ngOnInit() {
   // algo.triggerResize(true);
   
  }
  idleFunction(){
    if(!this.sectorDibujado){
      let puntos = this.municipalidad.idSectorNavigation.puntoSector;
      this.mapa.addDibujo(puntos);
      this.sectorDibujado = true;
      console.log(puntos);
    }
  }
  cambio(event: any) {
    switch (event.index) {
      case 0:
        this.mapMonitoreo.triggerResize(true);
        break;
      case 1:
        this.mapUnidades.triggerResize(true);
        break;
    }
  }

}

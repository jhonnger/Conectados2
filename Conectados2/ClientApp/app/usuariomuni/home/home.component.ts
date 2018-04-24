import {Component, OnInit, ViewChild} from '@angular/core';
import {AgmMap} from '@agm/core';
import {MatDialog} from '@angular/material';
import {NuevocasoComponent} from '../nuevocaso/nuevocaso.component';
import { Municipalidad } from '../../interfaces/Municipalidad.interface';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { DenunciaService } from '../../services/denuncia.service';
import { Denuncia } from '../../interfaces/Denuncia.interface';
import { Ubicacion } from '../../interfaces/Ubicacion.interface';

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
  position = 'below';
  municipalidad: Municipalidad = {
    ubicacion : {
      latitud : this.lat,
      longitud: this.lng
    }
  }
  constructor(public dialog: MatDialog, private _denunciaService: DenunciaService) {
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
   
  }
  addMarcadores(denuncias: Denuncia[]){
    for(let denuncia of denuncias){
        let ubicacion: Ubicacion = denuncia.posicionDenuncia;
        this.mapa.addMarker(ubicacion.latitud, ubicacion.longitud, denuncia.origenDenuncia.nombre);
        console.log(denuncia);
    }
  }
  idleFunction(){
    if(!this.sectorDibujado){
      let puntos = this.municipalidad.idSectorNavigation.puntoSector;
      this.mapa.addDibujo(puntos);
      this.sectorDibujado = true;
      this._denunciaService.listar().subscribe(
        response => {
           if(response.success){
             this.addMarcadores(response.data);
           }
        }
      );
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

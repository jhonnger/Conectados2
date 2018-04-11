import { Component, OnInit, ViewChild } from '@angular/core';
import { Sector } from '../../interfaces/Sector.interface';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';

import { SectorBuscadorModalComponent } from '../sector/sector-buscador-modal/sector-buscador-modal.component';
import { SectorService } from '../../services/sector.service';
import { UtilService } from '../../services/util.service';
import {MapaComponent} from '../../components/mapa/mapa.component';
import {TipoSectorService} from '../../services/tipo-sector.service';
import {SectorFormularioModalComponent} from '../sector/sector-formulario-modal/sector-formulario-modal.component';

declare var google: any;
@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {


    @ViewChild('mapa') mapa: MapaComponent;
    dialogRef: MatDialogRef<SectorBuscadorModalComponent>;

    nombreTipoSeccion = 'Seccion';
    idTipoSeccion: number;

    jurisdiccion: Sector = {};
    sectorActual: Sector = {};
    mostrarSectores: boolean = false;
    displayedColumns = ['pos', 'nombre'];
    secciones: Sector[] = [{nombre: '', tipoSector: {}}];
    dataSource = new MatTableDataSource(this.secciones);

    controls = false;
    buttons = {
        nuevo: false,
        modificar: false,
        guardar: false,
        cancelar: false,
        imprimir: false,
        eliminar: false,
        ver: false
    } ;

    constructor(public dialog: MatDialog,
                private _sectorService: SectorService,
                private _utilService: UtilService,
                private _tipoSectorService: TipoSectorService) { }

    ngOnInit() {
        this._tipoSectorService.listar().subscribe(
            data => {
                if(data.success){
                    this.buscarIdSeccion(data.data);
                } else{
                    this._utilService.alertMensaje('Error al cargar la página');
                }
            }
        );
        this.reiniciarFormulario();
        this.mapa.ultimoDibujado.subscribe(
            data => {
                this.sectorActual.puntoSector = data;
            },
            err => {

            }
        );
    }
    buscarIdSeccion(tiposSector){
        for(let tipoSector of tiposSector){
            if(tipoSector.nombre == this.nombreTipoSeccion){
                this.idTipoSeccion = tipoSector.idTipoSector;
                return;
            }
        }
    }
    abrirModalBuscarJurisdiccion(){
        this.dialogRef = this.dialog.open(SectorBuscadorModalComponent, {
            width: '80%'
          });

          const sub =  this.dialogRef.componentInstance.onAdd.subscribe((result) => {
            this.traerJurisdiccion(result);
            this.dialogRef.close();
          });
    }



    traerJurisdiccion(id){
        this._utilService.showLoading();
        this._sectorService.leerJurisdiccion(id).subscribe(
            response =>{
                this._utilService.hideLoading();
                this.controls = false;
                //this.modificarBotones(false, false, true, true, true, true, true);
                this.jurisdiccion = response.data;
                this.dataSource = new MatTableDataSource(response.data.sectores);
                this.dibujarJurisdiccion(this.jurisdiccion);
            },
            err => {
                this._utilService.hideLoading();
            }
        );
    }
    dibujarJurisdiccion(jurisdiccion: Sector){
        this.mapa.borrarDibujos();
        this.mapa.addDibujo(jurisdiccion.puntoSector);

        for(let sector of jurisdiccion.sectores){
            this.mapa.addDibujo(sector.puntoSector,'#68fffc', sector.nombre);
        }
    }


    reiniciarFormulario(){
        this.controls = false;
        this.mapa.deshabilitarDibujoMapa();
        this.reiniciarBotones();
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
    selecciona(id: any){
        this._sectorService.leer(id).subscribe(
            response => {
                if(response.success){
                    this.sectorActual = response.data;
                }
            },
            err => {
                console.log(err)
            }
        );
    }
    cambioMostrar(){

    }
    nuevo (){
        this.sectorActual = {};
        this.mapa.habiliarDibujoMapa();
        this.modificarBotones(false, true, false, false, true, false, false);
        this.controls = true;
    }
    guardar(){
        this.sectorActual.IdTipoSector = this.idTipoSeccion;
        this.sectorActual.IdSectorPadre = this.jurisdiccion.idSector;

        this._sectorService.guardar(this.sectorActual).subscribe(
            response => {
                if(response.success){
                    this._utilService.alertMensaje('Seccion guardada correctamente');
                } else{
                    this._utilService.alertMensaje('Error al guardar sección');
                }
            },
            err=> {
                this._utilService.alertMensaje('Error al guardar sección');
            }
        );
    }
    modificar(){
        this.controls = true;
        this.mapa.habiliarDibujoMapa();
        this.modificarBotones(false, true, false, false, true, false, false)
    }
    eliminar(){
    }
    cancelar(){
    }

}

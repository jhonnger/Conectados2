import {Injectable} from '@angular/core';
import {LoadingComponent} from '../components/Loading/loading.component';
import {MatDialog} from '@angular/material/dialog';
import { MensajeAlertComponent } from '../components/mensajeAlert/mensaje-alert.component';

@Injectable()
export class UtilService {

    dialogRefe: any;
    cantLoading = 0;
    constructor(public dialog: MatDialog) {
    }


    showLoading() {
        let id = "loading" + this.cantLoading;
        if(this.dialog.getDialogById(id)){
            this.cantLoading++;
            this.showLoading();
            return;
        }
        this.dialogRefe = this.dialog.open(LoadingComponent, {
            id: id,
            disableClose: true
        });
    }

    alertMensaje(mensaje: string){
        this.dialog.open(MensajeAlertComponent, {
            id: "mensaje",
            data: {mensaje}
            
        });
    }

    hideLoading(){
        this.dialogRefe.close();
        if(this.cantLoading > 0){
            this.cantLoading--;
        }
    }

    cambiarNumeroPuntoPorComa(numero: number){
        let numeroString: string = numero + "";

        numeroString = numeroString.replace('.', ',');

        console.log(numeroString);
        return parseFloat(numeroString);
    }
}
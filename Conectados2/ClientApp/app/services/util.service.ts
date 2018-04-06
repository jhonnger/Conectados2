import {Injectable} from '@angular/core';
import {LoadingComponent} from '../components/Loading/loading.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class UtilService {

    dialogRefe: any;
    constructor(public dialog: MatDialog) {
    }


    showLoading() {
        this.dialogRefe = this.dialog.open(LoadingComponent, {
            id: "loading", 
            disableClose: true
        });
    }

    hideLoading(){
        this.dialogRefe.close();
    }

    cambiarNumeroPuntoPorComa(numero: number){
        let numeroString: string = numero + "";

        numeroString = numeroString.replace('.', ',');

        console.log(numeroString);
        return parseFloat(numeroString);
    }
}
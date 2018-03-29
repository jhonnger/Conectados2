import {Injectable} from '@angular/core';
import {LoadingComponent} from '../components/Loading/loading.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class UtilService {

    dialogRef: any;
    constructor(public dialog: MatDialog) {
    }


    showLoading() {
        this.dialogRef = this.dialog.open(LoadingComponent, {
            disableClose: true
        });
    }

    hideLoading(){
        this.dialogRef.close();
    }
}
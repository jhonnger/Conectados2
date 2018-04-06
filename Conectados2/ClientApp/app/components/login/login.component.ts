import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UtilService} from '../../services/util.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario = {
        usuario: "",
        password: ""
    };
    usuarioFormControl = new FormControl('', [
        Validators.required
    ]);
    passwordFormControl = new FormControl('', [
        Validators.required
    ]);
    constructor(public snackBar: MatSnackBar,
                public dialog: MatDialog,
                private utilService: UtilService,
                private authService: AuthService,
                private _router: Router) {

    }

    ngOnInit() {
    }

    submit(){
        this.utilService.showLoading();
        this.authService.login(this.usuario.usuario, this.usuario.password).subscribe(
            (data: any) => {
                this.utilService.hideLoading();
                if (data != null){
                
                    let usuario : any = {};
                    usuario.usuario = data.username;
                    usuario.id = data.id;

                    localStorage.setItem('token', (data.token));
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    this._router.navigateByUrl('/home');
                }else {
                    this.openSnackBar();
                }
            },
            (err: any) => {
                this.utilService.hideLoading();
                this.openSnackBar();
            },
            () => {
                console.log('completed');
            }
        );
    }

    openSnackBar() {
        const snackBarRef = this.snackBar.open('Email o contraseña incorrecto', 'cerrar', {
            duration: 3000
        });
    }
}
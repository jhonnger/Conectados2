import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UtilService} from '../../services/util.service';
import {FormControl, Validators} from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
import { Constantes } from '../../util/constantes';
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
                private _router: Router,
                private _jwtHelper: JwtHelper) {

    }

    ngOnInit() {
    }

    submit(){
        this.utilService.showLoading();
        this.authService.login(this.usuario.usuario, this.usuario.password).subscribe(
            (response: any) => {
                this.utilService.hideLoading();
                if (response.success){
                    let data = response.data;
                    let usuario : any = {};
                    let tokenDecode;
                    usuario.usuario = data.username;
                    usuario.id = data.id;

                    localStorage.setItem('token', (data.token));
                    localStorage.setItem('usuario', JSON.stringify(usuario));

                    tokenDecode = this._jwtHelper.decodeToken(data.token);
                    if(tokenDecode){
                        this.direccionarSegunRol(tokenDecode.role);
                    }
                    
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
    direccionarSegunRol(rol: string){
    
        switch(rol){
            case Constantes.adminRol:  this._router.navigateByUrl('/admin/muni'); break;
            case Constantes.municipalRol: this._router.navigateByUrl('/home'); break;
            default: break;
        }
    }

    openSnackBar() {
        const snackBarRef = this.snackBar.open('Email o contraseña incorrecto', 'cerrar', {
            duration: 3000
        });
    }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {  MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import {  MatCardModule } from '@angular/material/card';


import { AppComponent } from './components/app/app.component';


import {ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material/core';
import { LoadingComponent } from "./components/Loading/loading.component";

import {LoginComponent} from './components/login/login.component';
import {UtilService} from './services/util.service';
import {AuthService} from './services/auth.service';

import {
    AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import { APP_ROUTES } from './app.routes';
import { UsuarioMuniComponent } from './usuariomuni/usuario-muni.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    declarations: [
        AppComponent,
        UsuarioMuniComponent,
        LoginComponent,
        LoadingComponent,
        AdminComponent
    ], entryComponents:[LoadingComponent],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
		MatButtonModule,
        MatDialogModule,
        MatNativeDateModule,
        MatListModule,
        MatGridListModule,
        MatCheckboxModule,
        MatInputModule,        
        APP_ROUTES,
    ],
    providers:[
        AuthService,
        UtilService,
        JwtHelper,
        AuthGuard
    ]
})
export class AppModuleShared {
}

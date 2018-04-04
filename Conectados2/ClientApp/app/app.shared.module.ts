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
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {
    AuthGuardService as AuthGuard} from './services/auth-guard.service';

import { APP_ROUTES } from './app.routes';
import { UsuarioMuniComponent } from './usuariomuni/usuario-muni.component';
import { AdminComponent } from './admin/admin.component';

import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { UsuarioMuniModule } from './usuariomuni/usuariomuni.module';
import { AdminModule } from './admin/admin.module';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LoadingComponent
    ], entryComponents:[LoadingComponent],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        AmazingTimePickerModule,
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
        AdminModule, 
        UsuarioMuniModule,    
        APP_ROUTES,
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:3001'],
              blacklistedRoutes: ['localhost:3001/auth/']
            }
          })
    ],
    providers:[
        AuthService,
        UtilService,
        AuthGuard,
        JwtHelperService
    ]
})
export class AppModuleShared {
}
export function tokenGetter() {
    return localStorage.getItem('token');
  }
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
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {LoginComponent} from './components/login/login.component';
import {UtilService} from './services/util.service';
import {AuthService} from './services/auth.service';

import { JwtHelper } from 'angular2-jwt';
import {AuthAdminGuardService as AdminGuard} from './services/auth-guard.service';
import { AuthMunicipalGuardService as MunicipalGuard } from "./services/auth-municipal.service";

import { APP_ROUTES } from './app.routes';
import { UsuarioMuniComponent } from './usuariomuni/usuario-muni.component';
import { AdminComponent } from './admin/admin.component';
import { MatTableModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { UsuarioMuniModule } from './usuariomuni/usuariomuni.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { MensajeAlertComponent } from './components/mensajeAlert/mensaje-alert.component';

import {MapaComponent} from './components/mapa/mapa.component';
import {NavegacionComponent} from './components/navegacion/navegacion.component';
import { AgmCoreModule } from '@agm/core';
import { MapaModule } from './components/mapa/mapa.module';


//Socket
//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LoadingComponent,
        MensajeAlertComponent,
    ], entryComponents:[LoadingComponent, MensajeAlertComponent],
    imports: [
        MapaModule,
        APP_ROUTES,
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
        AdminModule, 
        UsuarioMuniModule,   
        HttpClientModule,
        MatMenuModule,
        MatTableModule,
        MatInputModule,
        MatDatepickerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6l0Wq6cXBaDqF7I03FxvG-6-Py0Ib0F4',
            libraries: ['places','drawing']
        }),
        // SocketIoModule.forRoot(config) 
    ],
    providers:[
        AuthService,
        UtilService,
        AdminGuard,
        JwtHelper,
        MunicipalGuard
    ]
})
export class AppModuleShared {
}

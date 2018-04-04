import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatListModule, MatToolbarModule, MatGridListModule, MatCardModule,
  MatSlideToggleModule
} from '@angular/material';

import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ChatComponent } from './components/chat/chat.component';
import { UltialertaComponent } from "./components/ultialerta/ultialerta.component";
import {ChatService} from './services/chat.service';
import {TipoDenunciaService} from './services/tipo-denuncia.service'
import { NuevocasoComponent } from "./components/nuevocaso/nuevocaso.component";
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material';
import { LoadingComponent } from "./components/Loading/loading.component";
import { AsyncLocalStorageModule } from "angular-async-local-storage";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LoginComponent} from './components/login/login.component';
import {UtilService} from './services/util.service';
import {AuthService} from './services/auth.service';

import {
    AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {JwtHelper} from "angular2-jwt/angular2-jwt";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ChatComponent,
        NuevocasoComponent,
        LoginComponent,
		LoadingComponent,
        UltialertaComponent
    ], entryComponents:[NuevocasoComponent, LoadingComponent],
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
        MatTabsModule,
        MatDialogModule,
        MatNativeDateModule,
        AmazingTimePickerModule,
        MatListModule,
        MatGridListModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatStepperModule,
        AsyncLocalStorageModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6l0Wq6cXBaDqF7I03FxvG-6-Py0Ib0F4',
            libraries: ['places']
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
            { path: 'login', component: LoginComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        ChatService,
        TipoDenunciaService,
        AuthService,
        UtilService,
        JwtHelper,
        AuthGuard
    ]
})
export class AppModuleShared {
}

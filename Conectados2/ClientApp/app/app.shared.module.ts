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
import { ChatComponent } from './components/chat/chat.component'
import {ChatService} from './services/chat.service';
import {TipoDenunciaService} from './services/tipo-denuncia.service'
import {NuevocasoComponent} from "./components/nuevocaso/nuevocaso.component";
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ChatComponent,
        NuevocasoComponent
    ], entryComponents:[NuevocasoComponent],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
		MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        MatNativeDateModule,
        AmazingTimePickerModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatStepperModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6l0Wq6cXBaDqF7I03FxvG-6-Py0Ib0F4',
            libraries: ['places']
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        ChatService,
        TipoDenunciaService
    ]
})
export class AppModuleShared {
}

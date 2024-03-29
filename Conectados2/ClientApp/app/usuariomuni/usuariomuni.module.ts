
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { USUARIOMUNI_ROUTES } from './usuario-muni.routes';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { NuevocasoComponent } from './nuevocaso/nuevocaso.component';
import { HomeComponent } from './home/home.component';
import { UltialertaComponent } from './ultialerta/ultialerta.component';
import { AgmCoreModule } from '@agm/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button'
import { ChatService } from "../services/chat.service";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { TipoDenunciaService } from '../services/tipo-denuncia.service';
import { MatInputModule, MatTooltipModule } from '@angular/material';
import { UsuarioMuniComponent } from './usuario-muni.component';
import { MapaComponent } from '../components/mapa/mapa.component';
import { MapaModule } from '../components/mapa/mapa.module';
import { BarrasComponent } from '../components/graficos/barras/barras.component';
import { SectoresComponent } from '../components/graficos/sectores/sectores.component';
import { AnilloComponent } from '../components/graficos/anillo/anillo.component';
import { CurvasComponent } from '../components/graficos/curvas/curvas.component';
import { EstadisticasComponent } from '../usuariomuni/estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        HomeComponent,
        ChatComponent,
        NuevocasoComponent,
        UltialertaComponent,
        UsuarioMuniComponent,
        BarrasComponent,
        SectoresComponent,
        AnilloComponent,
        CurvasComponent,
        EstadisticasComponent,
    ], entryComponents:[NuevocasoComponent],
    exports: [
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatTabsModule,
        MatStepperModule,
        AmazingTimePickerModule,
        MatSelectModule,
        MatInputModule,        
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatTooltipModule,
        ChartsModule,
        USUARIOMUNI_ROUTES,
        MapaModule
        
    ], 
	providers: [
        ChatService,
        TipoDenunciaService
	],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsuarioMuniModule { }

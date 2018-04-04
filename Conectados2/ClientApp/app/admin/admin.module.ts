import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MunicipalidadComponent } from './municipalidad/municipalidad.component';
import { ADMIN_ROUTES } from './admin.routes';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { MunicipalidadBuscadorComponent } from './municipalidad/municipalidad-buscador/municipalidad-buscador.component';
import { MunicipalidadService } from '../services/municipalidad.service';
import { CommonModule } from '@angular/common';
import { MunicipalidadFormularioComponent } from './municipalidad/municipalidad-formulario/municipalidad-formulario.component';
import { TipoMuniService } from '../services/tipo-muni.service';
import { SectorComponent } from './sector/sector.component';
import { SectorBuscadorComponent } from './sector/sector-buscador/sector-buscador.component';
import { SectorFormularioComponent } from './sector/sector-formulario/sector-formulario.component';
import { SectorService } from '../services/sector.service';
import { TipoSectorService } from '../services/tipo-sector.service';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        MunicipalidadComponent,
        MunicipalidadBuscadorComponent,
        MunicipalidadFormularioComponent,
        SectorComponent,
        SectorBuscadorComponent,
        SectorFormularioComponent,
    ], entryComponents:[],
    exports: [
        
    ],
    imports: [
        FormsModule,
        MatTableModule,
        CommonModule ,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6l0Wq6cXBaDqF7I03FxvG-6-Py0Ib0F4',
            libraries: ['places','drawing']
        }),
        ADMIN_ROUTES
    ], 
	providers: [
        MunicipalidadService,
        TipoMuniService,
        SectorService,
        TipoSectorService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }

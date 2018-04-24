import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MunicipalidadComponent } from './municipalidad/municipalidad.component';
import { ADMIN_ROUTES } from './admin.routes';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTabsModule,
    MatDialogModule } from '@angular/material';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AdminComponent } from './admin.component';
import { AuthService } from '../services/auth.service';
import { AuthAdminGuardService as AuthGuard} from '../services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { MapaFuncionesService } from '../util/mapas-funciones.service';
import { SeccionComponent } from './seccion/seccion.component';
import { SectorBuscadorModalComponent } from './sector/sector-buscador-modal/sector-buscador-modal.component';
import {MapaComponent} from '../components/mapa/mapa.component';
import {SectorFormularioModalComponent} from './sector/sector-formulario-modal/sector-formulario-modal.component';
import {NavegacionComponent} from '../components/navegacion/navegacion.component';
import { MapaModule } from '../components/mapa/mapa.module';
@NgModule({
    declarations: [
        MunicipalidadComponent,
        MunicipalidadBuscadorComponent,
        MunicipalidadFormularioComponent,
        SectorComponent,
        AdminComponent,
        SectorBuscadorComponent,
        SectorFormularioComponent,
        SeccionComponent,
        SectorBuscadorModalComponent,

        NavegacionComponent,
        SectorFormularioModalComponent
    ], entryComponents:[SectorBuscadorModalComponent,SectorFormularioModalComponent],
    exports: [
        
    ],
    imports: [
        MapaModule,
        FormsModule,
        MatTableModule,
        MatMenuModule,
        CommonModule ,
        MatPaginatorModule,
        MatCheckboxModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule,
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
        TipoSectorService,
        AuthService,
        AuthGuard,
        JwtHelperService,
        MapaFuncionesService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }

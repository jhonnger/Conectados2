import { RouterModule, Routes } from '@angular/router';

import { MunicipalidadComponent } from './municipalidad/municipalidad.component';
import { SectorComponent } from './sector/sector.component';


const adminRoutes: Routes = [
    { path: 'muni', component: MunicipalidadComponent},
    { path: 'sector', component: SectorComponent},
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );

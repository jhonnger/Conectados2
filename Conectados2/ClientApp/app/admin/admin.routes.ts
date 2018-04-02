import { RouterModule, Routes } from '@angular/router';

import { MunicipalidadComponent } from './municipalidad/municipalidad.component';


const adminRoutes: Routes = [
    { path: 'muni', component: MunicipalidadComponent},
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );

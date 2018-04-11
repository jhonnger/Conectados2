import { RouterModule, Routes } from '@angular/router';

import { MunicipalidadComponent } from './municipalidad/municipalidad.component';
import { SectorComponent } from './sector/sector.component';
import { AdminComponent } from './admin.component';
import { AuthAdminGuardService as AdminGuard} from '../services/auth-guard.service';
import { SeccionComponent } from './seccion/seccion.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,   
        canActivate: [ AdminGuard ],
        children: [
            { path: 'muni', component: MunicipalidadComponent},
            { path: 'sector', component: SectorComponent},
            { path: 'seccion', component: SeccionComponent},
            { path: '**', redirectTo: '/login', pathMatch: 'full' }]
    },
    
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );

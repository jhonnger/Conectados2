import { RouterModule, Routes } from '@angular/router';

import { MunicipalidadComponent } from './municipalidad/municipalidad.component';
import { SectorComponent } from './sector/sector.component';
import { AdminComponent } from './admin.component';
import { AuthGuardService as AuthGuard} from '../services/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,   
        canActivate: [ AuthGuard ],
        children: [
            { path: 'muni', component: MunicipalidadComponent},
            { path: 'sector', component: SectorComponent},
            { path: '**', redirectTo: '/login', pathMatch: 'full' }]
    },
    
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );

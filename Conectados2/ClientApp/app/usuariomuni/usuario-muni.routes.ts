import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthMunicipalGuardService as MunicipalGuard} from '../services/auth-municipal.service';
import { UsuarioMuniComponent } from './usuario-muni.component';


const usuarioMuniRoutes: Routes = [
    {
        path: '',
        component: UsuarioMuniComponent,
        canActivate: [ MunicipalGuard ],
        children: [
            { path: 'home', component: HomeComponent},
            { path: '**', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];


export const USUARIOMUNI_ROUTES = RouterModule.forChild( usuarioMuniRoutes );

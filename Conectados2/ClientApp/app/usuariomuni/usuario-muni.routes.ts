import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard} from '../services/auth-guard.service';
import { UsuarioMuniComponent } from './usuario-muni.component';


const usuarioMuniRoutes: Routes = [
    {
        path: '',
        component: UsuarioMuniComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'home', component: HomeComponent},
            { path: '**', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];


export const USUARIOMUNI_ROUTES = RouterModule.forChild( usuarioMuniRoutes );

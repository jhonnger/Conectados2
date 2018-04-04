import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './usuariomuni/home/home.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { UsuarioMuniComponent } from './usuariomuni/usuario-muni.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: AdminComponent,   
        canActivate: [ AuthGuard ],
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: '',
        component: UsuarioMuniComponent,
        canActivate: [ AuthGuard ],
        loadChildren: './usuariomuni/usuariomuni.module#UsuarioMuniModule'
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes );

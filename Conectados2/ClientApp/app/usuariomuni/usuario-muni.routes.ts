import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard} from '../services/auth-guard.service';


const usuarioMuniRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


export const USUARIOMUNI_ROUTES = RouterModule.forChild( usuarioMuniRoutes );

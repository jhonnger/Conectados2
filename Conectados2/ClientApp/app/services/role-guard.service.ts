import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService,
                public router: Router,
                private jwtHelper: JwtHelper) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        if(token == null) return false;

        const tokenPayload = this.jwtHelper.decodeToken(token);
        if (
            !this.auth.isAuthenticated() ||
            tokenPayload.role !== expectedRole
        ) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
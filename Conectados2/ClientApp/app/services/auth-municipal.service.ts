import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthMunicipalGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router,public jwtHelper: JwtHelper) {}
    canActivate(): boolean { 
        const token = localStorage.getItem('token');
    // decode the token to get its payload
        const tokenPayload = this.jwtHelper.decodeToken(token);
        if (!this.auth.isAuthenticated() || tokenPayload.role !== "Municipal") {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
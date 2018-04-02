import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import  'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class AuthService {

    constructor(private http: Http,
                public jwtHelper: JwtHelper) {
    }

    login(user: string, password: string){

        return this.http.post( 'api/usuario/authenticate', { usuario: user, password})
            .map( res => {
                return res.json();
            });
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        if(token != null){
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;

    }
}
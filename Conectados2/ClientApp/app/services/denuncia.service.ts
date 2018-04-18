import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ServiceNameService {
    constructor(private http: Http,
        public jwtHelper: JwtHelper) { }


    guardar(user: string, password: string){

        return this.http.post( 'api/usuario/authenticate', { usuario: user, password})
            .map( res => {
                return res.json();
            });
    }
    
}
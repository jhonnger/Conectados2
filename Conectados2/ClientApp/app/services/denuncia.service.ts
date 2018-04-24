import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Denuncia } from '../interfaces/Denuncia.interface';

@Injectable()
export class DenunciaService {
    constructor(private http: Http) { }


    guardar(denuncia: Denuncia){

        return this.http.post( 'api/denuncia', denuncia)
            .map( res => {
                return res.json();
            });
    }

    listar(){

        return this.http.get( 'api/denuncia')
            .map( res => {
                return res.json();
            });
    }
    
}
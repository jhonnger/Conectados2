import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {AppSettings} from '../endPoint.config';
import {Municipalidad} from '../interfaces/Municipalidad.interface';
import { Constantes } from '../util/constantes';

@Injectable()
export class MunicipalidadService {

  url = AppSettings.API_ENDPOINT + 'api/municipalidad';

  constructor(private http: Http
              ) { }

  leer(id: any) {
    return this.http.get(this.url + '/' + id)
      .map( res => {
        return res.json();
      });
  }
  listar(pagina: number = 1) {
    let cant = Constantes.cantPorPagina;
    return this.http.get(this.url + '/pagina/'+pagina+'/cant/'+ cant )
      .map( res => {
        return res.json();
      });
  }
    guardar(muni: Municipalidad) {
        if(muni.idComiMuni){

            return this.http.put(this.url + '/' , muni,this.jwt())
                .map( res => {
                    return res.json();
                });
        }
        return this.http.post(this.url + '/' , muni,this.jwt())
            .map( res => {
                return res.json();
            });
    }
    private jwt() {
        // create authorization header with jwt token
        let token = (localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../endPoint.config';
import {Municipalidad} from '../interfaces/Municipalidad.interface';

@Injectable()
export class MunicipalidadService {

  url = AppSettings.API_ENDPOINT + 'api/municipalidad';

  constructor(private http: Http
              ) { }

  leer(id: any) {
    return this.http.get(this.url + '/' + id)
      .map( res => {
        return res;
      });
  }
  listar() {
    return this.http.get(this.url + '/pagina/1/cant/10' )
      .map( res => {
        return res.json();
      });
  }
    guardar(muni: Municipalidad) {
        if(muni.idComiMuni){

            return this.http.put(this.url + '/' , muni)
                .map( res => {
                    return res.json();
                });
        }
        return this.http.post(this.url + '/' , muni)
            .map( res => {
                return res.json();
            });
    }
}

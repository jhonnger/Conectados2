import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../endPoint.config';

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
    return this.http.get(this.url + '/' )
      .map( res => {
        return res.json();
      });
  }
}

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../endPoint.config';

@Injectable()
export class TipoSectorService {

  url = AppSettings.API_ENDPOINT + 'api/TipoSector';

  constructor(private http: Http
              ) { }

  leer(id: any) {
    return this.http.get(this.url + '/' + id)
      .map( res => {
        return res.json();
      });
  }
  listar() {
    return this.http.get(this.url + '/' )
      .map( res => {
        return res.json();
      });
  }
}

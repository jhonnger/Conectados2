import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {AppSettings} from '../endPoint.config';
import {Sector} from "../interfaces/Sector.interface";
import {Constantes} from '../util/constantes';

@Injectable()
export class SectorService {

  url = AppSettings.API_ENDPOINT + 'api/Sector';
  urlJurisdiccion = AppSettings.API_ENDPOINT + 'api/jurisdiccion';
  constructor(private http: Http
              ) { }

  leer(id: any) {
    return this.http.get(this.url + '/' + id)
      .map( res => {
        return res.json();
      });
  }
  leerJurisdiccion(id: any) {
    return this.http.get(this.urlJurisdiccion + '/' + id)
      .map( res => {
        return res.json();
      });
  }
  listarJurisdiccion(pagina: number = 1) {
      let cant = Constantes.cantPorPagina;
    return this.http.get(this.urlJurisdiccion + '/pagina/'+pagina+'/cant/'+ cant ,this.jwt())
      .map( res => {
        return res.json();
      });
  }

    guardar(sector: Sector) {
      if(sector.idSector){
        
        return this.http.put(this.url + '/' , sector)
            .map( res => {
                return res.json();
            });
      }      
        return this.http.post(this.url + '/' , sector)
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

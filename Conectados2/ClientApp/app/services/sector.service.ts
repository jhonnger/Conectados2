import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../endPoint.config';
import {Sector} from "../interfaces/Sector.interface";

@Injectable()
export class SectorService {

  url = AppSettings.API_ENDPOINT + 'api/Sector';

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

    crear(sector: Sector) {
        return this.http.post(this.url + '/' , sector)
            .map( res => {
                return res.json();
            });
    }
}

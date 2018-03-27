import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
//import { map } ;
import {map} from 'rxjs/operator/map';

@Injectable()
export class ChatService {
  // tslint:disable-next-line:no-inferrable-types
  UrlChat: string = 'https://chat-34f72.firebaseio.com/usuarios.json';

  constructor(private http: Http) { }

  listarContactos() {
    return this.http.get( this.UrlChat )
    .map( res => {
      return res.json();
    });
  }

  nuevoContacto(contacto: any) {
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
    return this.http.post(this.UrlChat, JSON.stringify(contacto), {headers} )
      .map( res => {
        return res.json();
      });
  }

}

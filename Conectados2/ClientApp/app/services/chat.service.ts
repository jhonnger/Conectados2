import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
//import { map } ;
import  'rxjs/add/operator/map';

@Injectable()
export class ChatService {
  // tslint:disable-next-line:no-inferrable-types
  UrlChat: string = 'http://localhost:5000/api/chat';
  res:any = [];

  constructor(private http: Http) { }
  
  
  //contactos/2 
  // se debe enviar el id de la municipalidad ejemplo = 2
  listarContactos(id_municipalidad:number) {
    return this.http.get( this.UrlChat + '/contactos/' + id_municipalidad )
    .map( res => {
      return res.json();
    });
  }

  //conversacion/6
  // se debe enviar el id del usuario ejemplo = 6
  listarConversaciones(id_usuario:number) {
    return this.http.get( this.UrlChat + '/conversacion/' + id_usuario )
    .map( res => {
      return res.json();
    });
  }

  //mensajes/1
  // se debe enviar el id de la conversacion ejemplo = 1
  listarMensajes(id_conversacion:number) {
    return this.http.get( this.UrlChat + '/mensajes/' + id_conversacion )
    .map( res => {
      return res.json();
    });
  }

  setMemoria(data:any,name:string){
    return localStorage.setItem(name,data);
  }

  deleteMemoria(name:string){
    return localStorage.removeItem(name);
  }

  getMemoria(name:string){    
   return localStorage.getItem(name);
  }

  




}




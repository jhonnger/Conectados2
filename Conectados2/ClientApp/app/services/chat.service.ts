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
  
  

  // Iniciar Conversacion usuario id = 6 contactos id =7 (alias usuario1)
  iniciarConversacion(id_contacto,username_contacto){
    let id_usuario = JSON.parse(this.getMemoria('usuario') || '{}');
    return this.http.get( this.UrlChat + '/contactos/' + id_usuario.id+"/"+ id_contacto+"/"+ username_contacto+"/" )
    .map( res => {
      return res.json();
    });
  }

  //contactos/2 
  // se debe enviar el id de usuario
  listarContactos() {
    let id_usuario = JSON.parse(this.getMemoria('usuario') || '{}');
    console.log(id_usuario.id);
    return this.http.get( this.UrlChat + '/contactos/' + id_usuario.id )
    .map( res => {
      return res.json();
    });
  }

  //conversacion/6
  // se debe enviar el id del usuario ejemplo = 6
  listarConversaciones() {
    let id_usuario = JSON.parse(this.getMemoria('usuario') || '{}');
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




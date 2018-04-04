import { Chat,Mensaje } from '../../interfaces/chat.interface';
import { Component, OnInit } from '@angular/core';
import { NgStyle, NgForOf } from '@angular/common';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  //lo utilizo en el chat
  contador: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  tam_chat: number = 200;
  // tslint:disable-next-line:no-inferrable-types
  flagChat: boolean = false;

  contactos: any = [];

  mensajes: any = [
    {descripcion: '',
    idConversacion: '',
    idUsuairo: '',
    ultimoMensaje: '',
    flag:''}
   ] ;

  conversaciones: any = [];

  // se coloca en los tabs
  chats: any = [];
  // individual de arriba
  _chat: any = {};

  text = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    
    // se debe tener el id de la municipalidad
    this.listarContactos(2);
   
    if (this.chatService.getMemoria('chats')) {
      this.chats = JSON.parse(this.chatService.getMemoria('chats') || '{}');
    }
 
  }


  minimizarChat() {    
    if (this.contador==0) {
      this.listarConversaciones(6);
    }
    this.flagChat = !this.flagChat;
    if (this.tam_chat === 530) {
      this.tam_chat = 200;
    } else {
      this.tam_chat = 530;
    }
    this.contador ++;
  }

  elegirMensaje(value: any) {
    let estado = 0;
    for (let i in this.chats) {
      if (value.idConversacion === this.chats[i].idConversacion) {
        estado ++;
      }     
    }

    if ( estado == 0){
      this._chat.descripcion = value.descripcion;
    this._chat.idConversacion = value.idConversacion;
    this._chat.idUsuario = value.idUsuario;
    
    this.listarMensajes(value.idConversacion);

    if (this.chats.length < 2){
      console.log(this.chats.length);
      this.chats.push(this._chat);
    }else {            
      this.chats.splice(0, 0, this._chat);
      this.chats.pop();
    }
    this._chat = {};
    this.chatService.setMemoria(JSON.stringify(this.chats) ,'chats');
    }
  }

  onEnter(event: any, value: any, texto: any) {
    const mensaje = {'user': 'tu', 'texto': '', 'hora': new Date().getHours()};
    if (event.key === 'Enter') {
      mensaje.texto = texto;
      value.conversacion.push(mensaje);
      this.text = '';
    }
  }


  // Se envie el id de la municipalidad para listar todos los contactos
  // ejemplo id: 2
  listarContactos(id_municipalidad:number){
    this.chatService.listarContactos(id_municipalidad).subscribe( res => {
      console.log(res);
      return res;
    });
  }


  // no me juzguen pero en el for html mensajes van estos datos si es confuso lo se pero ahi van
  // un wpps y te explico el porque?
  // se debe enviar el id del usuario ejemplo = 6
  listarConversaciones(id_usuario:number){
   
    if (this.chatService.getMemoria('conversaciones')) {
      this.mensajes = JSON.parse(this.chatService.getMemoria('conversaciones') || '{}');
      
    }else{
      this.chatService.listarConversaciones(id_usuario).subscribe( res => {
        
        this.mensajes = res;        
        this.chatService.setMemoria(JSON.stringify(this.mensajes) ,'conversaciones');
      });
    }
    return this.mensajes;
  }

  // no me juzguen pero en el for html conversacion van estos datos si es confuso lo se pero ahi van
  // un wpps y te explico el porque?
  // se debe enviar el id de la conversacion ejemplo
  listarMensajes(id_conversacion:number){   
    
    this.chatService.listarMensajes(id_conversacion).subscribe( res => {
      
      this._chat.conversaciones = res;        
    });
    return this._chat.conversaciones;
  }
}

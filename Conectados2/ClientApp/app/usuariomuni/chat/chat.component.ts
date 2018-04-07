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

  mensajes: any = [] ;

  conversaciones: any = [];

  _label: string = 'Mensaje';
  flag_msg_cont: boolean = false;
  // se coloca en los tabs
  chats: any = [];
  // individual de arriba
  _chat: any = {};

  text = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    
    
    if (this.chatService.getMemoria('chats')) {
      this.chats = JSON.parse(this.chatService.getMemoria('chats') || '{}');
    }
 
  }


  minimizarChat() {    
    if (this.contador==0) {
      // se debe tener el id de la municipalidad
      this.listarContactos(2);
    }
    this.flagChat = !this.flagChat;
    if (this.tam_chat === 530) {
      this.tam_chat = 200;
    } else {
      this.tam_chat = 530;
    }
    this.contador ++;
  }

  elegirContacto(value: any) {   

    // Para que no se me olvide sirve para saber si ya existe una 
    // conversacion con este usuario en las pestañas de chat   
    let estado = 0;
    for (let i in this.chats) {
      if (value.idConversacion === this.chats[i].idConversacion) {
        estado ++;
      }     
    }

    if ( estado == 0){   

     this.iniciarConversacion(6,value.idUsuario,value.username);
    
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
    if (this.chatService.getMemoria('contactos')) {
      this.contactos = JSON.parse(this.chatService.getMemoria('contactos') || '');
      
    }else{
      this.chatService.listarContactos(id_municipalidad).subscribe( res => {
        for (const cont of res) {
          if (cont.idUsuario != 6) {
            this.contactos.push(cont);
          }
        }
        if (this.contactos) {
          this.chatService.setMemoria(JSON.stringify(this.contactos) ,'contactos');
        }else{
          this.contactos = '';
        }        
        return this.contactos;
      });
    }
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
        if (this.mensajes) {
          this.chatService.setMemoria(JSON.stringify(this.mensajes) ,'conversaciones');
        }else{
          this.mensajes = '';
        }   
        
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
      if (this._chat.conversaciones === 0) {
        this._chat.conversacioness = '';
      }        
    });
    return this._chat.conversaciones;
  }

  // Conversacion
  iniciarConversacion(id_us,id_cont,username){
    this.chatService.iniciarConversacion(id_us,id_cont,username)
    .subscribe( (resp)=>{
      console.log(resp[0].dt.dt);
      this._chat = resp[0].dt.dt;
    });  
    console.log(this._chat);
    return this._chat;
  }
}


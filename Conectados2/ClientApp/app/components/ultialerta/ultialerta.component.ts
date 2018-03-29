import { Component, OnInit } from '@angular/core';
import { NgStyle, NgForOf } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-ultialerta',
  templateUrl: './ultialerta.component.html',
  styleUrls: ['./ultialerta.component.css']
})
export class UltialertaComponent implements OnInit {
    



    // tslint:disable-next-line:no-inferrable-types
    tam_chat: number = 200;
    // tslint:disable-next-line:no-inferrable-types
    flagChat: boolean = true;

    contactos: any = [];

    mensajes: any = [
        {
            'usuario': 'Jhon',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Jhon',
                    'text': 'hola que tal!!',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'hola que tal!!',
                'hora': '14:03'
            }
        },
        {
            'usuario': 'Jose',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Jose',
                    'text': 'Constesta el telefono',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'Constesta el telefono',
                'hora': '14:03'
            }
        },
        {
            'usuario': 'Luis',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Luis',
                    'text': 'La reunion es el sabado',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'La reunion es el sabado',
                'hora': '14:03'
            }
        },
        {
            'usuario': 'Johhny',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Johhny',
                    'text': 'Yara mano que fue!!',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'Yara mano que fue!!',
                'hora': '14:03'
            }
        },
        {
            'usuario': 'Rebeca',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Rebeca',
                    'text': 'Luis dio positivo',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'Luis dio positivo',
                'hora': '14:03'
            }
        }
    ];

    chats: any = [
        {
            'usuario': 'Jhon',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Jhon',
                    'text': 'hola que tal!!',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'hola que tal!!',
                'hora': '14:03'
            }
        },
        {
            'usuario': 'Jose',
            'bandera': true,
            'conversacion': [
                {
                    'user': 'tu',
                    'text': 'hola!!',
                    'hora': '14:00'
                },
                {
                    'user': 'Jose',
                    'text': 'Constesta el telefono',
                    'hora': '14:03'
                }
            ],
            'ultimo_mensaje': {
                'text': 'Constesta el telefono',
                'hora': '14:03'
            }
        }
    ];

    text = '';

    constructor(private chatService: ChatService) { }

    ngOnInit() {

    }


    minimizarChat() {
        this.flagChat = !this.flagChat;
        if (this.tam_chat === 200) {
            this.tam_chat = 200;
        } else {
            this.tam_chat = 200;
        }
        console.log(this.tam_chat);
    }

    elegirMensaje(mensaje: any) {
        this.chats.splice(0, 0, mensaje);
        this.chats.pop();
    }

    onEnter(event: any, value: any, text: any) {
        const mensaje = { 'user': 'tu', 'text': '', 'hora': new Date().getHours() };
        if (event.key === 'Enter') {
            mensaje.text = text;
            value.conversacion.push(mensaje);
            this.text = '';
        }
    }

  obtenerHoraActual() {
    const currentdate = new Date();
    const time = currentdate.getHours() + ':' + currentdate.getMinutes();
    return time;
  }
  obtenerFechaActual() {
    const currentdate = new Date();
    const date = (currentdate.getMonth() + 1)  + '/'
      + currentdate.getDate() + '/'
      + currentdate.getFullYear();
    return date;
  }

}

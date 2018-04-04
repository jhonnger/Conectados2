export interface Chat  {
    descripcion:string,
    conversacion:Conversacion[],
    idConversacion:number,
    idUsuario:number
}

interface Conversacion {
    idUsuario: number,
    texto: string,
    hora: Date,
    username: string
}

export interface Mensaje {
    descripcion: string,
    idConversacion: number,
    idUsuairo: number,
    ultimoMensaje: Conversacion[],
    flag:boolean

}
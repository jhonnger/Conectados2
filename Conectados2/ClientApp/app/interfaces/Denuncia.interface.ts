import { Ubicacion } from "./Ubicacion.interface";
import { OrigenDenuncia } from "./OrigenDenunia.interface";

export interface Denuncia{
    idDenuncia?: number;
    idTipoDenuncia?: number;
    idUsuario?: number;
    idEstadoDenuncia?: number;
    posicionDenuncia?: Ubicacion;
    posicionUsuario?: Ubicacion;
    origenDenuncia?: OrigenDenuncia;
    fecDenuncia?: string;
    descripcion?: string;
    navegador?: string;
    dispositivo?: string;
}
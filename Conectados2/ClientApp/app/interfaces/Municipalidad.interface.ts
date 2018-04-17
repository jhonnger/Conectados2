import { TipoMunicipalidad } from "./TipoMunicipalidad.interface";
import { Ubicacion } from "./Ubicacion.interface";

export interface Municipalidad{
    idComiMuni?: number;
    idTipoComiMuni?: number;
    tipoComiMuni?: TipoMunicipalidad;
    nombre?: string;
    idSector?: number;
    ubicacion?: Ubicacion;
}
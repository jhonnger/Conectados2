import { TipoMunicipalidad } from "./TipoMunicipalidad.interface";

export interface Municipalidad{
    idComiMuni?: number;
    idTipoComiMuni?: number;
    tipoComiMuni?: TipoMunicipalidad;
    nombre?: string;
}
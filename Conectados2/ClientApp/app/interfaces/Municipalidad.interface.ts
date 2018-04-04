import { TipoMunicipalidad } from "./TipoMunicipalidad.interface";

export interface Municipalidad{
    idTipoComiMuni?: number;
    tipoComiMuni?: TipoMunicipalidad;
    nombre?: string;
}
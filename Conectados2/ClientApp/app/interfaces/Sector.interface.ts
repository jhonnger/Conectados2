import { TipoSector } from "./TipoSector.interface";
import { PuntoSector } from "./PuntoSector.interface";

export interface Sector{
    idSector?: number;
    nombre?: string;
    IdTipoSector?: number;
    tipoSector?: TipoSector;
    puntoSector?: PuntoSector[];
}
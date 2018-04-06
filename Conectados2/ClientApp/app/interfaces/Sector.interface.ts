import { TipoSector } from "./TipoSector.interface";
import { PuntoSector } from "./PuntoSector.interface";

export interface Sector{
    IdSector?: number;
    nombre?: string;
    IdTipoSector?: number;
    tipoSector?: TipoSector;
    puntoSector?: PuntoSector[];
}
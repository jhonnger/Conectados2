import { TipoSector } from "./TipoSector.interface";

export interface Sector{
    IdSector?: number;
    nombre?: string;
    tipoSector: TipoSector;
}
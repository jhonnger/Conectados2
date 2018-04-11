import {Injectable} from '@angular/core';
import { LatLng, LatLngBounds } from '@agm/core';

@Injectable()
export class MapaFuncionesService {

    constructor() {
    }

    pointContainsBounds(point: LatLng, bounds: LatLngBounds){
        return bounds.contains(point);
    }
}
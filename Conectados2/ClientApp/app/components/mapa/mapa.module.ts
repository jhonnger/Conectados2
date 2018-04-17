import { NgModule } from '@angular/core';

import { MapaComponent } from './mapa.component';
import { AgmCoreModule, AgmMap } from '@agm/core';

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6l0Wq6cXBaDqF7I03FxvG-6-Py0Ib0F4',
            libraries: ['places','drawing']
        }),
    ],
    exports: [MapaComponent, AgmMap],
    declarations: [MapaComponent],
    providers: [],
})
export class MapaModule { }

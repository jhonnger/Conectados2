import { NgModule } from '@angular/core';
import { MunicipalidadComponent } from './municipalidad/municipalidad.component';
import { ADMIN_ROUTES } from './admin.routes';

@NgModule({
    declarations: [
        MunicipalidadComponent
    ], entryComponents:[],
    exports: [
        
    ],
    imports: [
      
        ADMIN_ROUTES
    ], 
	providers: [
      
	]
})
export class AdminModule { }

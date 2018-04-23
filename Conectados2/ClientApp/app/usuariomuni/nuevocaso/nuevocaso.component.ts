import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoDenunciaService} from '../../services/tipo-denuncia.service';
import {TipoDenuncia} from '../../interfaces/TipoDenuncia';
import {UtilService} from "../../services/util.service";
import {AgmMap} from "@agm/core";
import { Municipalidad } from '../../interfaces/Municipalidad.interface';
import { Ubicacion } from '../../interfaces/Ubicacion.interface';
import { Denuncia } from '../../interfaces/Denuncia.interface';
import { DenunciaService } from '../../services/denuncia.service';


//declare var geocoder: any;
declare var google: any;
@Component({
  selector: 'app-nuevocaso',
  templateUrl: './nuevocaso.component.html',
  styleUrls: ['./nuevocaso.component.css']
})
export class NuevocasoComponent implements OnInit{
    

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup; 
  thirdFormGroup: FormGroup;

  tipoDenuncia: TipoDenuncia[] = [];
  @ViewChild('mapNuevoCaso') mapNuevoCaso: any;
  ubicacion: Ubicacion = {
    latitud: 40.7786232,
    longitud: -74.0007019
  }
  lat = 40.7786232;
  lng = -74.0007019;
  date = new FormControl(new Date());

  constructor(private _formBuilder: FormBuilder,
              private _denunciaService: DenunciaService,
              private _tipoDenunciaService: TipoDenunciaService,
              private _utilService: UtilService) { }

  ngOnInit() {
    
    let muni: Municipalidad = JSON.parse(localStorage.getItem('municipalidad'));
    if(muni){
      this.ubicacion = muni.ubicacion;
    }
    this.firstFormGroup = this._formBuilder.group({
      tipoIncidente: ['', Validators.required],
      horaIncidente: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      direccionIncidente: ['', Validators.required]
    });

    const horaActual = this.obtenerHoraActual();
    const fechaActual = this.obtenerFechaActual();

    this.firstFormGroup.patchValue({
      horaIncidente: horaActual
    });
    this._utilService.showLoading();
    this._tipoDenunciaService.listar().subscribe(
        data => {
            console.log(data);
            if(data.success){
                this.tipoDenuncia = (data.data);
            }
            
                this._utilService.hideLoading();
            //
        }
    );       
  }

  obtenerHoraActual() {
    const currentdate = new Date();
    const time = currentdate.getHours() + ':' + currentdate.getMinutes();
    return time;
  }
  obtenerFechaActual() {
    const currentdate = new Date();
    const date = (currentdate.getMonth() + 1)  + '/'
      + currentdate.getDate() + '/'
      + currentdate.getFullYear();
    return date;
  }
    idleFunction(){
      
      let lat = this.mapNuevoCaso.latitude;
      let lng = this.mapNuevoCaso.longitude;
      
      this.geoDecoder(lat, lng);
        
        console.log(this.mapNuevoCaso.latitude);
        console.log(this.mapNuevoCaso.longitude);
       
    }
    geoDecoder(lat: number, lng: number){
      
        let latlng = new google.maps.LatLng(lat, lng);
        let request = {
            latLng: latlng
        };
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode(request, (results: any, status: any) => {
            let direccion = "";
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0] != null) {

                  direccion = results[0].formatted_address;                    
                } else {
                    direccion = "";
                }
            }
            this.secondFormGroup.patchValue({
              direccionIncidente: direccion
            });
        });
        this.lat = lat;
        this.lng = lng;
    }
    guardar(){
      let denuncia: Denuncia = {};
      let browserInfo = this._utilService.get_browser_info();
      let ubicacionDenuncia: Ubicacion = {};

      ubicacionDenuncia.latitud = this.lat;
      ubicacionDenuncia.longitud = this.lng;
      ubicacionDenuncia.descripcion = this.secondFormGroup.value.direccionIncidente;
      
      denuncia.navegador = browserInfo.name;
      denuncia.dispositivo = this._utilService.getOS();
      denuncia.fecDenuncia = this.date.value;
      denuncia.posicionDenuncia = ubicacionDenuncia;
      denuncia.posicionUsuario = ubicacionDenuncia;
      denuncia.idTipoDenuncia = this.firstFormGroup.value.tipoIncidente;
    
      this._denunciaService.guardar(denuncia).subscribe(
        response => {
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
      console.log(denuncia);
      console.log(this.firstFormGroup.value);
    }

}

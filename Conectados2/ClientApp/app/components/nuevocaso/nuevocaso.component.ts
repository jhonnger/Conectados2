import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoDenunciaService} from '../../services/tipo-denuncia.service';
import {TipoDenuncia} from '../../interfaces/TipoDenuncia';
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-nuevocaso',
  templateUrl: './nuevocaso.component.html',
  styleUrls: ['./nuevocaso.component.css']
})
export class NuevocasoComponent implements OnInit, AfterViewInit {
    

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tipoDenuncia: TipoDenuncia[] = [];
  lat = 40.7786232;
  lng = -74.0007019;
  date = new FormControl(new Date());

  constructor(private _formBuilder: FormBuilder,
              private _tipoDenunciaService: TipoDenunciaService,
              private _utilService: UtilService) { }

  ngOnInit() {
    
    this.firstFormGroup = this._formBuilder.group({
      tipoIncidente: ['', Validators.required],
      horaIncidente: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    const horaActual = this.obtenerHoraActual();
    const fechaActual = this.obtenerFechaActual();

    this.firstFormGroup.patchValue({
      horaIncidente: horaActual
    });
  }
    ngAfterViewInit(){
      setTimeout( () =>{
          this._utilService.showLoading();
          this._tipoDenunciaService.listar().subscribe(
              data => {
                  console.log(data);
                  if(data.success){
                      this.tipoDenuncia = (data.data);
                  }
                  this._utilService.hideLoading();
              }
          );     
      }, 200);
        
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

}

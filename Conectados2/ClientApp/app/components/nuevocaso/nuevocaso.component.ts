import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoDenunciaService} from '../../services/tipo-denuncia.service';
import {TipoDenuncia} from '../../interfaces/TipoDenuncia';

@Component({
  selector: 'app-nuevocaso',
  templateUrl: './nuevocaso.component.html',
  styleUrls: ['./nuevocaso.component.css']
})
export class NuevocasoComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tipoDenuncia: TipoDenuncia[] = [];
  lat = 40.7786232;
  lng = -74.0007019;
  date = new FormControl(new Date());

  constructor(private _formBuilder: FormBuilder,
              private _tipoDenunciaService: TipoDenunciaService) { }

  ngOnInit() {
    this._tipoDenunciaService.listar().subscribe(
      data => {
        this.tipoDenuncia = JSON.parse(JSON.stringify(data));
      }
    );
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

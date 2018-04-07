import { Component, OnInit } from '@angular/core';
import { NgStyle, NgForOf } from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  irRuta(ruta: string){
    this._router.navigateByUrl(ruta);
  }

}

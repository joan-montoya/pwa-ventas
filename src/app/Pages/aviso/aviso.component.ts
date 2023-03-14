import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  regresar(){
    this.router.navigate(['/Registro']);
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.scss'],
})
export class ConsumoComponent implements OnInit {

  data: any;

  constructor(private rickmorty: UsuariosService) { }

  ngOnInit() {
    this.obtenerApi();
  }

  obtenerApi() {
    this.rickmorty.obtenerApi().then((data: any) =>{
      this.data=data.results;
    }).catch((err) =>{
      console.log(err);
      console.log(this.data)
    })
  }
}

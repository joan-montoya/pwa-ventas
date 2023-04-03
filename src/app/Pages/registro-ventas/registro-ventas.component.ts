import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-registro-ventas',
  templateUrl: './registro-ventas.component.html',
  styleUrls: ['./registro-ventas.component.scss'],
})
export class RegistroVentasComponent implements OnInit {

  @Input() ventas: any

  constructor( private router: Router,public Productos: UsuariosService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.Productos.obtenerVentas().then((data: any) =>{
      console.log(data.ventas);
      this.ventas=data.ventas;
    }).catch((err) =>{
      console.log(err);
    })
    console.log(this.ventas);
  }

  back(){
    this.router.navigate(['/Inventario']);
  }

}

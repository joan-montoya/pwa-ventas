import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  @Input() productos: any 
  @Input() products :Array<any> = [];;
  restante = 0;
  arrProductosini:Array<any> = [];

  constructor(public Productos: UsuariosService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    await this.Productos.obtenerProducto().then((data: any) =>{
      console.log(data.productos);
      this.productos=data.productos;
    }).catch((err) =>{
      console.log(err);
    })
    console.log(this.productos)
  }
  

}

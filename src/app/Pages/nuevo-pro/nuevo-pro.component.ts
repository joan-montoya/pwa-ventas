import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-pro',
  templateUrl: './nuevo-pro.component.html',
  styleUrls: ['./nuevo-pro.component.scss'],
})
export class NuevoProComponent implements OnInit {
  @Input() productos: any 
  @Input() categorias: any 
  @Input() nombre: any 

  Producto = {
    nombre: "",
    categoriaID: "",
    precio: "",
    cantidad: "",
    cantidadMax: "",
    cantidadMed: ""
  }

  seleccionCat = false;

  constructor(public Productos: UsuariosService,public Categorias: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    this.Productos.obtenerProducto().then((data: any) =>{
      console.log(data.productos);
      this.productos=data.productos;
    }).catch((err) =>{
      console.log(err);
    })
    console.log(this.productos);
  }

  obtenerCategorias() {
    this.Categorias.obtenerCategorias().then((data: any) =>{
      console.log(data.categorias);
      this.categorias=data.categorias;
    }).catch((err) =>{
      console.log(err);
    })
    console.log(this.categorias);
  }

  registrarProductos(){
    this.nombre = localStorage.getItem("nomCat");
    this.Producto.categoriaID = this.nombre;
    console.log(this.Producto)
    //ingresamos los datos al servicio
    this.Productos.registrarProducto(this.Producto).then((data: any) =>{
      Swal.fire({
        title: 'Se registro el producto',
        position: 'center',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!',
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      })
    }).catch((err) =>{
      //console.log(err);
        })
        
  }

  selectNomCat(nombre: any){
    localStorage.setItem("nomCat", nombre);
    this.seleccionCat = true;
  }

  back(){
    this.router.navigate(['/Inventario']);
  }

}

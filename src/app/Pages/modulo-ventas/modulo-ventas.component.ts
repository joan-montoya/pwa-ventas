import { Component, OnInit, Input  } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulo-ventas',
  templateUrl: './modulo-ventas.component.html',
  styleUrls: ['./modulo-ventas.component.scss'],
})
export class ModuloVentasComponent implements OnInit {

  @Input() productos: any;
  total = 0;
  cantidadProd = 0;
  val = 0;
  arrProductos:Array<any> = [];

  constructor(public Productos: UsuariosService) { 
    
  }

  ngOnInit() {
    this.obtenerProductos();
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

  cuenta(valor: any,object:any){
    this.val =parseInt(valor);
    this.arrProductos.push(object)
    this.total = this.total + parseInt(valor);
    this.cantidadProd = this.cantidadProd + 1;
  }

  cobrar(){
    Swal.fire({
      title: '¿Estas seguro de tu venta?',
      position: 'center',
      icon: 'warning',
      html:
      '<h5><FONT color="black">Cobraras un total de : '+this.total+'$</FONT></h5>' +
      '<h5><FONT color="black">Un total de : '+this.cantidadProd+' productos</FONT></h5>'+
      '<h5>Cantidad con la que el cliente esta pagando <ion-icon name="arrow-down-outline"></ion-icon></h5>'
      ,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
      heightAuto: false,
      input: 'text',
      inputAttributes: {
      autocapitalize: 'off'
    },
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if (parseInt(result.value.login) > this.total){
          Swal.fire({
            icon: 'success',
            title: "Cambio del cliente",
            text: `$ ${parseInt(result.value.login) - this.total} `,
            heightAuto: false
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: "El cliete no paga lo suficiente",
            text: `Faltan: $ ${(parseInt(result.value.login) - this.total) * -1} `,
            heightAuto: false
          })
        }
        
         //location.reload();
         this.limpiar();
      }
    })
  }

  limpiar(){
    this.total = 0;
    this.cantidadProd = 0;
  }

}

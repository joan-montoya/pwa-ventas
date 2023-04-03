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
  arrProductosini:Array<any> = [];
  @Input() productosini: any;

  Venta = {
    cantProd : 0,
    totalVenta: 0,
    cambio: 0,
    ingreso: 0,
  }

  constructor(public Productos: UsuariosService) { 
    
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.Productos.obtenerProducto().then((data: any) =>{
      console.log(data.productos);
      this.productos=data.productos;
      this.productosini = data.productos;
    }).catch((err) =>{
      console.log(err);
    })
    console.log(this.productos);
  }

  cuenta(valor: any,object:any){
    if(object.cantidad > 0){
      this.arrProductosini.push(object)
      this.val =parseInt(valor);
      this.arrProductos.push(object)
      this.total = this.total + parseInt(valor);
      this.cantidadProd = this.cantidadProd + 1;
      this.reducirProducto(object)
      if(object.cantidadMed == object.cantidad){
        Swal.fire({
          icon: 'warning',
          title: "El producto esta por agotarse",
          text: ` ${object.cantidad} piezas`,
          heightAuto: false
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: "El producto se agoto",
        text: ` ${object.cantidad} piezas`,
        heightAuto: false
      })
    }
  }

  cobrar(){
    this.Venta.totalVenta = this.total;
    this.Venta.cantProd = this.cantidadProd;
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
          this.Venta.ingreso = parseInt(result.value.login)
          this.Venta.cambio = (parseInt(result.value.login) - this.total)
          //se ingresa la venta
          this.Productos.registrarVenta(this.Venta).then((data: any) =>{
          }).catch((err) =>{
            console.log(err);
              })

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
         //this.limpiar();
         console.log(this.Venta)
      }
    })
  }

  reducirProducto(producto: any){
    producto.cantidad = parseInt(producto.cantidad) - 1
    this.Productos.modificarProdcuto(producto).then((data: any) =>{
    }).catch((err) =>{
      console.log(err);
        })
  }

  cancelarCompra(){
    for(let x = 0; x < this.arrProductosini.length; x++){
      this.arrProductosini[x].cantidad = this.arrProductosini[x].cantidad + 1;
      this.Productos.modificarProdcuto(this.arrProductosini[x]).then((data: any) =>{
      }).catch((err) =>{
        console.log(err);
          })
    }
    Swal.fire({
      icon: 'success',
      title: "Se regresaron un total de ",
      text: `$ ${this.arrProductosini.length} Prodcutos`,
      heightAuto: false,
      confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!',
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
    })
  }

  limpiar(){
    this.total = 0;
    this.cantidadProd = 0;
    location.reload();
  }

}

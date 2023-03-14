import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-cat',
  templateUrl: './nueva-cat.component.html',
  styleUrls: ['./nueva-cat.component.scss'],
})
export class NuevaCatComponent implements OnInit {

  @Input() categorias: any 

  Categoria = {
    nombreCat: "",
    descripcion: ""
  }

  constructor(public Categorias: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.obtenerCategorias();
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

  registrarCategoria(){
    console.log(this.Categoria)
    //ingresamos los datos al servicio
    this.Categorias.registrarCategoria(this.Categoria).then((data: any) =>{
      Swal.fire({
        title: 'Se registro categoria',
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
  back(){
    this.router.navigate(['/Inventario']);
  }

}

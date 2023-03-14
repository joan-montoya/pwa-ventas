import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2' 

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.scss'],
})
export class RegistoComponent implements OnInit {

  Usuario = {
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    telefono: "",
    nombreempresa: ""
  }
  @Input() usuarios: any 

  avisoc = false;

  constructor(public Usuarios: UsuariosService,private router: Router) {
   }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  registrarUsuario(){
    console.log(this.Usuario)
    //ingresamos los datos al servicio
    this.Usuarios.registrarUsuario(this.Usuario).then((data: any) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro Completo',
        text: '<a href="/Aviso">¿Tienes una cuenta?</a>',
        showConfirmButton: true,
        timer: 1500,
        heightAuto: false
      })

      //limpiamos la variable de entorno una vez que se allan insertado
      localStorage.setItem('nombre', this.Usuario.nombre);
      localStorage.setItem('apellidos', this.Usuario.nombre);
      localStorage.setItem('email', this.Usuario.email);
      localStorage.setItem('password', this.Usuario.password);
      localStorage.setItem('telefono', this.Usuario.telefono);
      localStorage.setItem('nombreempresa', this.Usuario.nombreempresa);
    }).catch((err) =>{
      //console.log(err);
        })
        
  }

  obtenerUsuarios() {
    this.Usuarios.obtenerUsuarios().then((data: any) =>{
      console.log(data.usuarios);
      this.usuarios=data.usuarios;
    }).catch((err) =>{
      console.log(err);
    })
    console.log(this.usuarios);
  }
  
  prueba(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Leer aviso de privacidad',
      text: 'No puedes crear una cuenta sin aceptar el aviso de privacidad',
      footer: '<a href="/Aviso">Leer aviso</a>',
      showConfirmButton: true,
      heightAuto: false
      
    })
  }

  avisoA(){
    this.avisoc = true
  }
  avisoB(){
    //se guardan los datos en una variable de entorno para concerbarlos
    localStorage.setItem('nombre', this.Usuario.nombre);
    localStorage.setItem('apellidos', this.Usuario.nombre);
    localStorage.setItem('email', this.Usuario.email);
    localStorage.setItem('password', this.Usuario.password);
    localStorage.setItem('telefono', this.Usuario.telefono);
    localStorage.setItem('nombreempresa', this.Usuario.nombreempresa);

    //navegamos al aviso de privacidad
    //this.router.navigate(['/Aviso']);
    window.open('http://localhost:8100/Aviso', '_blank');
  }
}

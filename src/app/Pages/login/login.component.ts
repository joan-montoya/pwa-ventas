import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Input() usuarios: any 
  @Input() f5: any

  Usuario = {
    password: "",
    email: ""
  }

  constructor(public Usuarios: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.f5 = localStorage.getItem('f5');
    if(this.f5 == 'true'){
      localStorage.setItem('f5', 'false');
      location.reload();
    }
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

  iniciar(){
    for(let x = 0; x < this.usuarios.length; x++){
      if(this.Usuario.email == this.usuarios[x].email && this.Usuario.password == this.usuarios[x].password){
        localStorage.setItem('log', 'true');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Credeciales correctas',
            showConfirmButton: false,
            timer: 1000,
            heightAuto: false,
          })
          this.router.navigate(['/Home']);
          localStorage.setItem('f5', 'true');
          localStorage.setItem('men', 'true');
          break;
          
      }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Credeciales incorrectas',
            showConfirmButton: false,
            timer: 1500,
            heightAuto: false
          })
      }
    }
    
  }

}

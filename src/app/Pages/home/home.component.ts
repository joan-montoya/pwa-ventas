import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Input() f5: any
  @Input() menu: any
  

  constructor(private router: Router) { }

  ngOnInit() {
    this.f5 = localStorage.getItem('f5');
    if(this.f5 == 'true'){
      localStorage.setItem('f5', 'false');
      location.reload();
    }
    this.menu = localStorage.getItem('men');
    if(this.f5 == 'false'){
      if(this.menu == 'true'){
        localStorage.setItem('men', 'false');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Despliega el menú lateral',
          html:
        '<h5><ion-icon name="arrow-forward-outline"></ion-icon><ion-icon name="arrow-forward-outline"></ion-icon><FONT color="black">  Desliza de izquierda a derecha para desplegar el menú</FONT></h5>',
          showConfirmButton: true,
          heightAuto: false,
        })
      }
    }
  }
  async back(){
    localStorage.setItem('log', 'false');
    localStorage.setItem('f5', 'true');
    this.router.navigate(['/Login']);
  }

  

}

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
})
export class UbicacionComponent implements OnInit {
  lat: any
  lon: any
  latG = 0;
  latM = 0;
  latS = 0;
  latGMS = "";
  lonG = 0;
  lonM = 0;
  lonS = 0;
  lonGMS = "";
  latlon = "";
  GMSlat = "";
  GMSlon = "";

  constructor() { }

  ngOnInit() {
    this.printCurrentPosition();
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
  
    console.log('Current position:', coordinates);
    this.lat = coordinates.coords.latitude;
    this.lon = coordinates.coords.longitude;

    //convertimos la latitud a grados minutos segundos
    this.latG = Math.trunc(this.lat);
    this.latM = Math.trunc((this.lat - this.latG)*60);
    this.latS = (((this.lat - this.latG)*60) - this.latM)*60;
    // guardamos la conversion en una variable
    this.latGMS = this.latG+"%C2%B0"+this.latM+"'"+this.latS.toFixed(1)+"%22"
    // guardamos la conversion para mostrarla
    this.GMSlat = this.latG+"°"+this.latM+"'"+this.latS.toFixed(1)+"''"


    //convertimos la latitud a grados minutos segundos
    this.lonG = (Math.trunc(this.lon) * -1 );
    this.lonM = (Math.trunc((this.lon + this.lonG)*60) * -1);
    this.lonS = ((((this.lon * -1 ) - this.lonG)*60) - this.lonM)*60;
    // guardamos la conversion en una variable apta para una url
    this.lonGMS = this.lonG+"%C2%B0"+this.lonM+"'"+this.lonS.toFixed(1)+"%22"
    // guardamos la conversion para mostrarla
    this.GMSlon = this.lonG+"°"+this.lonM+"'"+this.lonS.toFixed(1)+"''"

    //se unen las conversiones para utilzarlas como ruta de acceso
    this.latlon = this.latGMS + "N+" + this.lonGMS;
  }

}

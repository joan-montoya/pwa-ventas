import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //url = 'https://back-login12.herokuapp.com';
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get(`${this.url}/usuario`).toPromise();
    }

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.url}/usuario`, usuario).toPromise();
    }

  registrarCategoria(categoria: any) {
      return this.http.post(`${this.url}/categoria`, categoria).toPromise();
    }

  obtenerCategorias() {
      return this.http.get(`${this.url}/categoria`).toPromise();
    }

  registrarProducto(categoria: any) {
      return this.http.post(`${this.url}/producto`, categoria).toPromise();
  }

  obtenerProducto() {
      return this.http.get(`${this.url}/producto`).toPromise();
    }
}

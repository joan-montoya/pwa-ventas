import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //url = 'http://localhost:3000';
 url = 'https://back-ventas12.herokuapp.com';

  url1 = 'https://rickandmortyapi.com/api/character';


  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get(`${this.url}/usuario`).toPromise();
    }
  obtenerVentas() {
    return this.http.get(`${this.url}/ventas`).toPromise();
      }
  obtenerApi() {
    return this.http.get(`${this.url1}`).toPromise();
    }

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.url}/usuario`, usuario).toPromise();
    }

  registrarCategoria(categoria: any) {
      return this.http.post(`${this.url}/categoria`, categoria).toPromise();
    }

  registrarVenta(venta: any) {
    return this.http.post(`${this.url}/ventas`, venta).toPromise();
    }

  obtenerCategorias() {
      return this.http.get(`${this.url}/categoria`).toPromise();
    }

  registrarProducto(categoria: any) {
      return this.http.post(`${this.url}/producto`, categoria).toPromise();
  }
  modificarProdcuto(producto: any) {
    return this.http.put(`${this.url}/productos/${producto._id}`, producto).toPromise();
    
}
modificarProdcuto2(producto: any,id:any) {
  return this.http.put(`${this.url}/productos/${id}`, producto).toPromise();
  
}
modificarCategoria(producto: any,id:any) {
  return this.http.put(`${this.url}/categoria/${id}`, producto).toPromise();
  
}
borrarProductos(id:any) {
  return this.http.delete(`${this.url}/producto/${id}`).toPromise();
  
}
borrarCategoria(id:any) {
  return this.http.delete(`${this.url}/categoria/${id}`).toPromise();
  
}

  obtenerProducto() {
      return this.http.get(`${this.url}/producto`).toPromise();
    }
}

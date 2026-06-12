import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../pages/producto-list/producto-list';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<Producto[]>("http://localhost:3000/api/productos")
  }
}

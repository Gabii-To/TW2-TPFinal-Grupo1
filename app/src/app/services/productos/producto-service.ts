import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../../modules/productos/interfaces/producto.interface';
import { environment } from '../../../environments/environment.development';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<Producto[]>(`${environment.API_URL}/productos`)
  }

  agregarProdAlCarrito(producto: Producto) {
    return this.http.post(`${environment.API_URL}/carrito/agregar`, producto);
  }

  verProducto(id: number) {
    return this.http.get<Producto>(`${environment.API_URL}/productos/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of(null);
        }
        return throwError(() => err);
      })
    );
  }

  agregarProducto(producto: Producto) {
    return this.http.post(`${environment.API_URL}/productos/crear`, producto);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<Producto[]>("http://localhost:3000/api/productos")
  }

  agregarProdAlCarrito()
  {

  }

  verProducto(id: number) {
    return this.http.get<Producto>(`http://localhost:3000/api/productos/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of(null);
        }
        return throwError(() => err);
      })
    );
  }

  agregarProducto(producto: Producto) {
    return this.http.post("http://localhost:3000/api/productos/crear", producto);
  }
}

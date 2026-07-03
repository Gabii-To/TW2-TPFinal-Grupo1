import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from './../../../services/auth/auth-service';
import { Producto } from '../interfaces/producto.interface';

@Component({
  standalone: true,
  selector: 'app-tabla-productos',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './tabla-productos.html',
})
export class TablaProductos {
  productos = input.required<Producto[]>();

  constructor(public authService: AuthService) {}

  imagenPrincipal(producto: Producto) {
    return producto.imagenes?.[0];
  }

  imagenSrc(producto: Producto) {
    const imagen = this.imagenPrincipal(producto);
    return imagen ? `data:${imagen.tipo_mime};base64,${imagen.datos}` : '';
  }
}

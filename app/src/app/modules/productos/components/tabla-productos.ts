  import { Component, input } from '@angular/core';
  import { CurrencyPipe } from '@angular/common';
  import { Producto } from '../interfaces/producto.interface';
  import { AuthService } from './../../../services/auth/auth-service';
  import { RouterLink } from '@angular/router';

  @Component({
    standalone: true,
    selector: 'app-tabla-productos',
    imports: [CurrencyPipe, RouterLink],
    templateUrl: './tabla-productos.html',
    styleUrls: ['./tabla-productos.css'],
  })
  export class TablaProductos {
    productos = input.required<Producto[]>();

    constructor(public authService: AuthService) {}
  }

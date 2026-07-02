import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../interfaces/producto.interface';
import { AuthService } from './../../../services/auth/auth-service';
import { RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-tabla-productos',
  imports: [CurrencyPipe, RouterLink, Card, Tag, Button],
  templateUrl: './tabla-productos.html',
})
export class TablaProductos {
  productos = input.required<Producto[]>();

  constructor(public authService: AuthService) {}
}

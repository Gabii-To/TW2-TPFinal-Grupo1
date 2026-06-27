import {Component, signal} from '@angular/core';
import {ProductoService} from '../../services/producto-service';
import {CurrencyPipe} from '@angular/common';
import { RouterLink } from "@angular/router";
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-list',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})

export class ProductoList {
  productos = signal<Producto[]>([]);

  constructor(public productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe((datos) => {
      this.productos.set(datos);
    });
  }

}

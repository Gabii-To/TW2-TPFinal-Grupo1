import {Component, signal} from '@angular/core';
import {ProductoService} from '../../services/producto-service';
import {CurrencyPipe} from '@angular/common';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  usuario_id: number;
}

@Component({
  selector: 'app-producto-list',
  imports: [
    CurrencyPipe
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

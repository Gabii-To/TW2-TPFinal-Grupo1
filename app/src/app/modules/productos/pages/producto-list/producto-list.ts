import {Component, signal} from '@angular/core';
import {ProductoService} from '../../../../services/productos/producto-service';
import {Producto} from '../../interfaces/producto.interface';
// import {CurrencyPipe} from '@angular/common';
import {TablaProductos} from '../../components/tabla-productos';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-producto-list',
  imports: [
    // CurrencyPipe,
    TablaProductos, RouterLink],
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

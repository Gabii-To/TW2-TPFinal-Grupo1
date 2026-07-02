import { Component, signal } from '@angular/core';
import { ProductoService } from '../../../../services/productos/producto-service';
import { Producto } from '../../interfaces/producto.interface';
import { TablaProductos } from '../../components/tabla-productos';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  imports: [TablaProductos, Button, RouterLink],
  templateUrl: './producto-list.html',
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

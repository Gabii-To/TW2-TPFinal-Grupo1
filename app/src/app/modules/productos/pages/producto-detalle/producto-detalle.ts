import { Component, signal } from '@angular/core';
import { ProductoService } from '../../../../services/productos/producto-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth-service';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  templateUrl: './producto-detalle.html',
  imports: [CurrencyPipe, RouterLink, Card, Tag, Button],
})
export class ProductoDetalle {
  producto = signal<Producto | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productoService.verProducto(id).subscribe((producto) => {
      if (!producto) {
        this.router.navigate(['/productos']);
        return;
      }

      this.producto.set(producto);
    });
  }

  agregarAlCarrito(producto: Producto) {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    if (!producto.id) {
      return;
    }

    this.productoService.agregarProdAlCarrito(usuario.id, producto.id, 1).subscribe({
      next: () => {
        this.router.navigate(['/carrito']);
      },
      error: (err) => {
        console.error('Error al agregar el producto al carrito:', err);
      },
    });
  }
}

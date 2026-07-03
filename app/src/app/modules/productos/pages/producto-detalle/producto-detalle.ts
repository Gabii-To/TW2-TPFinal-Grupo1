import { Component, signal } from '@angular/core';
import { ProductoService } from '../../../../services/productos/producto-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto, ProductoImagen } from '../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth-service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.html',
  imports: [
    CurrencyPipe,
    RouterLink
  ]
})
export class ProductoDetalle {

  producto = signal<Producto | null>(null);
  imagenActualIndex = signal(0);

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productoService.verProducto(id).subscribe(producto => {
      if (!producto) {
        this.router.navigate(['/productos']);
        return;
      }

      this.producto.set(producto);
      this.imagenActualIndex.set(0);
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
      }
    });
  }

  imagenSrc(imagen: ProductoImagen) {
    return `data:${imagen.tipo_mime};base64,${imagen.datos}`;
  }

  imagenActual(producto: Producto) {
    return producto.imagenes?.[this.imagenActualIndex()] ?? producto.imagenes?.[0] ?? null;
  }

  seleccionarImagen(index: number) {
    this.imagenActualIndex.set(index);
  }

  imagenAnterior(producto: Producto) {
    const total = producto.imagenes?.length ?? 0;

    if (total === 0) {
      return;
    }

    this.imagenActualIndex.update((index) => (index - 1 + total) % total);
  }

  imagenSiguiente(producto: Producto) {
    const total = producto.imagenes?.length ?? 0;

    if (total === 0) {
      return;
    }

    this.imagenActualIndex.update((index) => (index + 1) % total);
  }
}

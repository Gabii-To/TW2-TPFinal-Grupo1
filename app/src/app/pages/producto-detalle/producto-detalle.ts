import { Component, signal } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CurrencyPipe } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productoService.verProducto(id).subscribe(producto => {
      if (!producto) {
        this.router.navigate(['/productos']);
        return;
      }

      this.producto.set(producto);
    });
  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto-service';

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './producto-crear.html',
  styleUrl: './producto-crear.css',
})
export class ProductoCrear {

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  producto = {
    nombre: '',
    descripcion: '',
    clasificacion: '',
    precio: 0,
    usuario_id: 1
  };

  guardar() {
    this.productoService.agregarProducto(this.producto).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error creando producto:', err);
      }
    });
  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../services/productos/producto-service';
import { AuthService } from '../../../../services/auth/auth-service';

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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
  }

  producto = {
    nombre: '',
    descripcion: '',
    clasificacion: '',
    precio: 0,
    usuario_id: 1
  };

  formError = '';
  submitting = false;

  guardar() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.formError = '';

    if (
      !this.producto.nombre ||
      !this.producto.descripcion ||
      !this.producto.clasificacion ||
      !this.producto.precio
    ) {
      this.formError = 'Por favor completa todos los campos obligatorios';
      return;
    }

    if (this.producto.precio <= 0) {
      this.formError = 'El precio debe ser mayor a 0';
      return;
    }

    this.submitting = true;

    this.productoService.agregarProducto(this.producto).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.submitting = false;
        this.formError = 'Error al crear el producto';
        console.error(err);
      }
    });
  }
}

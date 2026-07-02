import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../services/productos/producto-service';
import { AuthService } from '../../../../services/auth/auth-service';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    Card,
    Button,
    InputText,
    Textarea,
    Select,
    InputNumber,
    Message,
  ],
  templateUrl: './producto-crear.html',
})
export class ProductoCrear {
  categorias = ['Tecnología', 'Hogar', 'Deportes', 'Ropa', 'Otros'];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private authService: AuthService,
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
    usuario_id: 1,
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
      },
    });
  }
}

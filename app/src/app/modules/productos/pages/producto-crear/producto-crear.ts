import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth-service';
import { ProductoService } from '../../../../services/productos/producto-service';
import { ProductoImagen } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './producto-crear.html',
})
export class ProductoCrear {
  categorias = ['Tecnología', 'Hogar', 'Deportes', 'Ropa', 'Otros'];

  producto = {
    nombre: '',
    descripcion: '',
    clasificacion: '',
    precio: 0,
    usuario_id: 0,
    imagenes: [] as ProductoImagen[],
  };

  formError = '';
  submitting = false;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  guardar() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) return;

    this.formError = '';
    this.producto.usuario_id = usuario.id;

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

  onImagenesSeleccionadas(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivos = Array.from(input.files ?? []);

    archivos
      .filter((archivo) => archivo.type.startsWith('image/'))
      .forEach((archivo) => {
        const reader = new FileReader();

        reader.onload = () => {
          const resultado = String(reader.result ?? '');
          const datos = resultado.includes(',') ? resultado.split(',')[1] : resultado;

          this.producto.imagenes.push({
            datos,
            tipo_mime: archivo.type,
          });
        };

        reader.readAsDataURL(archivo);
      });

    input.value = '';
  }

  eliminarImagen(index: number) {
    this.producto.imagenes.splice(index, 1);
  }

  imagenSrc(imagen: ProductoImagen) {
    return `data:${imagen.tipo_mime};base64,${imagen.datos}`;
  }
}

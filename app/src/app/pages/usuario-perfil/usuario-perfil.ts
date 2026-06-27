import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-perfil',
  imports: [FormsModule],
  templateUrl: './usuario-perfil.html',
  styleUrl: './usuario-perfil.css',
})
export class UsuarioPerfil {
  usuario: any = {
    nombre: '',
    apellido: '',
    email: '',
    direccion: ''
  };
  passwordActual = '';
  passwordNuevo = '';
  confirmarPassword = '';

  loading = true;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const user = this.usuarioService.getUsuarioLogueado();

    if (!user) return;

    this.usuarioService.obtenerUsuario(user.id).subscribe({
      next: (data) => {
        this.usuario = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  guardarCambios(): void {

    this.usuarioService.editarUsuario(this.usuario.id, this.usuario)
      .subscribe({
        next: () => {
          alert("Perfil actualizado.");
        },
        error: (err) => {
          console.error(err);
        }
      });

  }

  eliminarCuenta() {

    if (!confirm("¿Seguro que querés eliminar tu cuenta?")) {
      return;
    }

    this.usuarioService.eliminarUsuario(this.usuario.id)
      .subscribe({
        next: () => {
          alert("Cuenta eliminada.");
        },
        error: (err) => {
          console.error(err);
        }
      });

  }

  cambiarPassword(): void {

    if (this.passwordNuevo !== this.confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    this.usuarioService
      .cambiarPassword(
        this.usuario.id,
        this.passwordActual,
        this.passwordNuevo
      )
      .subscribe({
        next: (respuesta: any) => {

          alert(respuesta.mensaje);

          this.passwordActual = '';
          this.passwordNuevo = '';
          this.confirmarPassword = '';

          window.location.reload();
        },
        error: (error) => {
          alert(error.error.error);
        }
      });

  }
}

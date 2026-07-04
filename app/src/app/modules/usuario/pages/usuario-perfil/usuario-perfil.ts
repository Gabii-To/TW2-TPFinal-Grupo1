import { Component, signal } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario-service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../auth/interfaces/usuario.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth-service';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [FormsModule, Card, Button, InputText, Password, ProgressSpinner],
  templateUrl: './usuario-perfil.html',
})
export class UsuarioPerfil {
  usuario = signal<Usuario | null>(null);

  passwordActual = '';
  passwordNuevo = '';
  confirmarPassword = '';

  loading = signal(true);

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const usuarioLogueado = this.authService.usuarioLogueado();

    if (!usuarioLogueado) return;

    this.usuarioService.obtenerUsuario(usuarioLogueado.id).subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  guardarCambios(): void {
    const user = this.usuario();

    if (!user) return;

    this.usuarioService.editarUsuario(user.id, user).subscribe({
      next: () => {
        alert('Perfil actualizado.');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  eliminarCuenta() {
    const user = this.usuario();

    if (!user) return;

    if (!confirm('¿Seguro que querés eliminar tu cuenta?')) {
      return;
    }

    this.usuarioService.eliminarUsuario(user.id).subscribe({
      next: () => {
        alert('Cuenta eliminada.');
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cambiarPassword(): void {
    const user = this.usuario();

    if (!user) return;

    if (this.passwordNuevo !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.usuarioService
      .cambiarPassword(user.id, this.passwordActual, this.passwordNuevo)
      .subscribe({
        next: (respuesta: any) => {
          alert(respuesta.message);

          this.passwordActual = '';
          this.passwordNuevo = '';
          this.confirmarPassword = '';

          window.location.reload();
        },
        error: (error) => {
          alert(error.error.error);
        },
      });
  }
}

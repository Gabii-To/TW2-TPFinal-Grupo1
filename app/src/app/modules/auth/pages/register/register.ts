import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { SignupUsuario } from '../../interfaces/usuario.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, Card, Button, Password, InputText],
  templateUrl: './register.html',
})
export class Register {
  usuarioService = inject(AuthService);
  private fb = inject(FormBuilder);
  router: Router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  registerForm: FormGroup;
  formError = '';

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/),
        ],
      ],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.formError = 'Completá todos los campos correctamente para registrarte';
      return;
    }

    const usuario: SignupUsuario = this.registerForm.value as SignupUsuario;
    this.formError = '';
    this.createUsuario(usuario);
  }

  createUsuario(usuario: SignupUsuario) {
    this.usuarioService.register(usuario).subscribe({
      next: (res) => {
        console.log('Usuario creado: ', res);
        this.router.navigate(['/productos']);
      },
      error: (error) => {
        setTimeout(() => {
          this.formError = this.obtenerMensajeError(error);
          this.cdr.detectChanges();
        });
        console.log('Hubo un error al crear Usuario', error);
      },
    });
  }

  private obtenerMensajeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body = error.error;

      if (typeof body === 'string' && body.trim()) {
        if (body.includes('EmailRepetido')) {
          return 'Ya existe un usuario con ese email';
        }

        return body;
      }

      if (body && typeof body === 'object') {
        const mensaje =
          (body as { error?: string; mensaje?: string }).error ??
          (body as { error?: string; mensaje?: string }).mensaje;

        if (mensaje === 'EmailRepetido') {
          return 'Ya existe un usuario con ese email';
        }

        if (mensaje) {
          return mensaje;
        }
      }

      if (error.status === 409) {
        return 'Ya existe un usuario con ese email';
      }
    }

    return 'No se pudo crear el usuario';
  }
}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { SignupUsuario } from '../../interfaces/usuario.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const usuario: SignupUsuario = this.registerForm.value as SignupUsuario;
      this.createUsuario(usuario);
    }
  }

  createUsuario(usuario: SignupUsuario) {
    this.usuarioService.register(usuario).subscribe({
      next: (res) => {
        console.log('Usuario creado: ', res);
      },
      error: (error) => {
        console.log('Hubo un error al crear Usuario', error);
      },
      complete: () => {
        this.router.navigate(['/productos']);
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth-service';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-recuperar-clave',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, InputText],
  templateUrl: './recuperar-clave.html',
  styleUrl: './recuperar-clave.css',
})
export class RecuperarClave {

  usuarioService = inject(AuthService);
   private fb = inject(FormBuilder);
   router: Router = inject(Router);
//   recuperarClaveForm : FormGroup;


     recuperarClaveForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
 /**  constructor() {
     this.recuperarClaveForm= this.fb.group({
        email: ['', [Validators.required, Validators.email]],
     })
   } **/

   onSubmit() {
    if (this.recuperarClaveForm.valid) {
      const { email } = this.recuperarClaveForm.value;
      this.recuperarClaveForm.disable();
      console.log('Solicitando recuperación para el correo: ', email);

      this.usuarioService.recuperarClave(email).subscribe({
        next: () => {
          alert('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada y sigue el enlace proporcionado.');

          setTimeout(() => {
            this.router.navigate(['/login'])}, 5000); 
        },
        error: (error) => {
          this.recuperarClaveForm.enable();
          console.error('Error al solicitar recuperación de clave:', error);
                  alert('El correo electrónico ingresado no se encuentra registrado en el sistema.');
        }
      });
    }
  }
}

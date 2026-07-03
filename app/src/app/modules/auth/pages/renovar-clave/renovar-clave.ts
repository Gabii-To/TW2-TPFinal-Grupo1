import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-renovar-clave',
  imports: [ReactiveFormsModule, CommonModule, Card, Button, Password],
  templateUrl: './renovar-clave.html',
  styleUrl: './renovar-clave.css',
})
export class RenovarClave {

   usuarioService = inject(AuthService);
   private fb = inject(FormBuilder);
   router: Router = inject(Router);
   private route = inject(ActivatedRoute);
   token: string = '';

  renovarClaveForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)]]
  });
  
  ocultarPassword: boolean = true;

  verPassword() {
    this.ocultarPassword = !this.ocultarPassword;
  }

   ngOnInit(){
    this.token = this.route.snapshot.params['token'] || '';
      if (!this.token) {
      alert('Token de recuperación inválido o ausente.');
      this.router.navigate(['/auth']);
    }
   }

   onSubmit() {
    if(this.renovarClaveForm.valid) {
      const { password } = this.renovarClaveForm.value;
      console.log('Renovando clave con token: ', this.token, ' y nueva contraseña: ', password);
      
      this.usuarioService.renovarClave(this.token, password).subscribe({
        next:() => {
          alert('Contraseña renovada con éxito. Ahora puedes iniciar sesión con tu nueva contraseña.');
          this.router.navigate(['/login']);
        },
                error: (err) => {
          console.error('El backend rechazó la petición por este motivo:', err);
          alert('Hubo un error al intentar renovar la contraseña. Por favor, intenta nuevamente.');
        }
      })
    }
  }
}

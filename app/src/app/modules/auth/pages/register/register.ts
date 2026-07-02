import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { SignupUsuario } from '../../interfaces/usuario.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {

   usuarioService = inject(AuthService);
   private fb = inject(FormBuilder);
   router: Router = inject(Router);
   registerForm : FormGroup;

   constructor() {
     this.registerForm= this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],//
        nombre: ['',[Validators.required]],
        apellido: ['',[Validators.required]],
        direccion: ['', [Validators.required]]
     })
   }
  
   onSubmit(){
    if(this.registerForm.valid){
      const usuario: SignupUsuario = this.registerForm.value as SignupUsuario;
      
    this.createUsuario(usuario);
    console.log(this.registerForm.value);
    }   
   }

  createUsuario(usuario: SignupUsuario) {
    this.usuarioService.register(usuario).subscribe({
      next: (res) => {
        console.log('Usuario creado: ', res);
      }, error: (error) => {
        console.log("Hubo un error al crear Usuario" , error);
      }, complete: () => {
        this.router.navigate(['/productos']);
      }
    });
}}
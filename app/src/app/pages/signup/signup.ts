import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  usuario: any = {
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    password: '',
  };

  registrar(): void {

    this.authService.register(this.usuario).subscribe({
      next: (res: any) => {

        alert(res.mensaje);

        this.usuario = {
          nombre: '',
          apellido: '',
          email: '',
          direccion: '',
          password: '',
        };

        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.error);
      },
    });

  }
}

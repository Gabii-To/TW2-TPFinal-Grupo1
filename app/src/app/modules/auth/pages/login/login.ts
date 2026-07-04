import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  returnUrl!: string;
  formError = '';

  private cdr = inject(ChangeDetectorRef);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.formError = 'Completá el email y la contraseña para iniciar sesión';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.formError = '';

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl || '/');
      },
      error: (err) => {
        setTimeout(() => {
          this.formError = this.obtenerMensajeError(err);
          this.cdr.detectChanges();
        });
        console.error('Error de login', err);
      },
    });
  }

  private obtenerMensajeError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const errorBody = err.error;

      if (typeof errorBody === 'string' && errorBody.trim()) {
        return errorBody;
      }

      if (errorBody && typeof errorBody === 'object') {
        const mensaje =
          (errorBody as { error?: string; mensaje?: string }).error ??
          (errorBody as { error?: string; mensaje?: string }).mensaje;

        if (mensaje) {
          return mensaje;
        }
      }

      if (err.status === 400) {
        return 'Completá el email y la contraseña para iniciar sesión';
      }

      if (err.status === 401) {
        return 'Credenciales inválidas';
      }
    }

    return 'No se pudo iniciar sesión';
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../../services/auth/auth-service';

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
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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
    this.formError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.formError = 'Completá el email y la contraseña para iniciar sesión';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.submitting = true;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigateByUrl(this.returnUrl || '/');
      },
      error: (err) => {
        this.submitting = false;
        this.formError = err?.error?.error || 'No se pudo iniciar sesión';
        console.error('Error de login', err);
      },
    });
  }
}

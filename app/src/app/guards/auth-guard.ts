import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { CanActivateChildFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateChildFn = (_childRoute, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.estaLogueado()
    ? true
    : router.parseUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`);
};

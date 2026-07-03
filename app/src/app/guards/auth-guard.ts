import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (_childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaLogueado()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

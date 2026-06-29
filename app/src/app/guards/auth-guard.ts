import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Guard');
  console.log('state.url =', state.url);
  console.log('estaLogueado =', authService.estaLogueado());
  console.log('localStorage =', typeof localStorage);
  console.log(
    'usuario =',
    typeof localStorage !== 'undefined' ? localStorage.getItem('usuario') : 'SERVER',
  );

  if (authService.estaLogueado()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.routes').then(a => a.authRoutes)
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.routes').then(p => p.productosRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

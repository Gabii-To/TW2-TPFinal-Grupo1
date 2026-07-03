import { Routes } from '@angular/router';
import { MenuComponent } from './public/menu/menu.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.routes').then((a) => a.authRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then((a) => a.authRoutes),
  },
  {
    path: '',
    component: MenuComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'productos',
        pathMatch: 'full',
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./modules/productos/productos.routes').then((p) => p.productosRoutes),
      },
      {
        path: 'carrito',
        loadChildren: () => import('./modules/pedidos/pedidos.routes').then((c) => c.carritoRoutes),
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./modules/pedidos/pedidos.routes').then((p) => p.pedidosRoutes),
      },
      {
        path: 'usuario',
        loadChildren: () => import('./modules/usuario/usuario.routes').then((a) => a.usuarioRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'productos',
  },
];

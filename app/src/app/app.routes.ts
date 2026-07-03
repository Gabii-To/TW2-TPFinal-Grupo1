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
    path: 'carrito',
    loadChildren: () => import('./modules/pedidos/pedidos.routes').then(c => c.carritoRoutes)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./modules/pedidos/pedidos.routes').then(p => p.pedidosRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(a => a.authRoutes)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./modules/usuario/usuario.routes').then(a => a.usuarioRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

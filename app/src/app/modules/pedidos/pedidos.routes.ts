import { Routes } from '@angular/router';
import { PedidoList } from './pages/pedido-list';
import { CarritoDetalle } from './pages/carrito-detalle';
import { authGuard } from '../../guards/auth-guard';

export const pedidosRoutes: Routes = [
  {
    path: '',
    component: PedidoList,
    canActivate: [authGuard],
  },
];

export const carritoRoutes: Routes = [
  {
    path: '',
    component: CarritoDetalle,
    canActivate: [authGuard],
  },
];

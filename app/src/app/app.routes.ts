import { Routes } from '@angular/router';
import {ProductoList} from './pages/producto-list/producto-list';
import {Login} from './pages/login/login';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'productos',
    component: ProductoList,
  },
  { 
    path: 'productos/:id', 
    component: ProductoDetalle
  },
  {
    path: 'login',
    component: Login,
  }
];

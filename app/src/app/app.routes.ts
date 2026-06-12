import { Routes } from '@angular/router';
import {ProductoList} from './pages/producto-list/producto-list';
import {Login} from './pages/login/login';

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
    path: 'login',
    component: Login,
  }
];

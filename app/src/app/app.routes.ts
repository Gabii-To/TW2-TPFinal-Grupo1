import { Routes } from '@angular/router';
import {ProductoList} from './pages/producto-list/producto-list';
import {Login} from './pages/login/login';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { ProductoCrear } from './pages/producto-crear/producto-crear';
import { UsuarioPerfil } from './pages/usuario-perfil/usuario-perfil';
import { Signup } from './pages/signup/signup';

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
    path: 'productos/crear',
    component: ProductoCrear
  },
  {
    path: 'productos/:id',
    component: ProductoDetalle
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'usuario/perfil',
    component: UsuarioPerfil
  }
];

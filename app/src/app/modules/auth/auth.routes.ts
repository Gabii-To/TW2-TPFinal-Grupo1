import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { RecuperarClave } from "./pages/recuperar-clave/recuperar-clave";
import { RenovarClave } from "./pages/renovar-clave/renovar-clave";

export const authRoutes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'recuperar-clave',
    component: RecuperarClave
  },
  {
    path: 'renovar-clave/:token',
    component: RenovarClave
  }
];

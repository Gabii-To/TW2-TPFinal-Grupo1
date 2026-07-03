import {Routes} from '@angular/router';
import {UsuarioPerfil} from './pages/usuario-perfil/usuario-perfil';
import {authGuard} from '../../guards/auth-guard';

export const usuarioRoutes: Routes = [
  {
    path: "",
    component: UsuarioPerfil,
    canActivate: [authGuard]
  }
];

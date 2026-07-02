import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Usuario} from '../../modules/auth/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  obtenerUsuario(id: number) {
    return this.http.get<Usuario>(`${environment.API_URL}/usuarios/${id}`);
  }

  editarUsuario(id: number, usuario: Usuario) {
    return this.http.put(`${environment.API_URL}/usuarios/${id}`, usuario);
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${environment.API_URL}/usuarios/${id}`);
  }

  cambiarPassword(id: number, passwordActual: string, passwordNueva: string) {
    return this.http.put(`${environment.API_URL}/usuarios/password/${id}`,
      {passwordActual, passwordNueva});
  }
}

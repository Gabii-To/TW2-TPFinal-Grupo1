import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';
import { SignupUsuario, Usuario } from '../../modules/auth/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioLogueado = signal<Usuario | null>(null);
  private ready = false;
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        const usuario: Usuario = res.usuario;
        this.guardarUsuario(usuario);
      }),
    );
  }

  initAuth() {
    const usuario = this.obtenerUsuarioStorage();
    this.usuarioLogueado.set(usuario);
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

  estaLogueado(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    return localStorage.getItem('usuario') !== null;
  }

  register(usuario: SignupUsuario) {
    return this.http.post(`${environment.API_URL}/usuarios/register`, usuario).pipe(
      tap((res: any) => {
        const usuario: Usuario = res.usuario;
        this.guardarUsuario(usuario);
      })
    );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioLogueado.set(null);
  }

  private guardarUsuario(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioLogueado.set(usuario);
  }

  private obtenerUsuarioStorage(): Usuario | null {
    console.log('localStorage:', typeof localStorage);
    if (typeof localStorage === 'undefined') {
      return null;
    }
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api/usuarios';

  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cambiarPassword(id: number, passwordActual: string, passwordNueva: string) {
    return this.http.put('http://localhost:3000/api/auth/password', {
      id,
      passwordActual,
      passwordNueva
    });
  }

  getUsuarioLogueado() {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
}

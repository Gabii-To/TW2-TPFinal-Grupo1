export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  direccion: string;
}

export interface SignupUsuario {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  direccion: string;
}

export interface SigninUsuario {
  email: string;
  password: string;
}

import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";
export declare class UsuarioService {
    private usuarioRepository;
    constructor(usuarioRepository: UsuarioRepository);
    signup(usuario: Usuario): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
    signin(email: string, password: string): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
    private passwordValida;
    private ocultarPassword;
    getDatosDeUsuario(id: number): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    } | null>;
    editarUsuario(id: number, data: {
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    } | null>;
    eliminarUsuario(id: number): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    } | null>;
    cambiarPassword(id: number, passwordActual: string, passwordNueva: string): Promise<{
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
}
//# sourceMappingURL=usuario.service.d.ts.map
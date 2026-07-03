import type { Usuario } from "../models/usuario.model.js";
export declare class UsuarioRepository {
    findUsuarioByEmail(email: string): Promise<{
        password: string;
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    } | null>;
    createUsuario(data: Omit<Usuario, "id">): Promise<{
        password: string;
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
    obtenerPorId(id: number): Promise<{
        password: string;
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
        password: string;
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
    eliminarUsuario(id: number): Promise<{
        password: string;
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
    editarPassword(id: number, password: string): Promise<{
        password: string;
        id: number;
        email: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }>;
}
//# sourceMappingURL=usuario.repository.d.ts.map
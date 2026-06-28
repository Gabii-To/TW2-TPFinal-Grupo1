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
}
//# sourceMappingURL=usuario.repository.d.ts.map
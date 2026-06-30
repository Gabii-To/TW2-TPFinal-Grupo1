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
}
//# sourceMappingURL=usuario.service.d.ts.map
import { type Request, type Response } from "express";
export declare class UsuarioController {
    private usuarioRepository;
    private usuarioService;
    constructor();
    getUsuarios: (req: Request, res: Response) => Promise<void>;
    getUsuarioPorId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    editarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    eliminarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    cambiarPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=usuario.controller.d.ts.map
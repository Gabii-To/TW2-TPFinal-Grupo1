import { type Request, type Response } from "express";
export declare class UsuarioController {
    private usuarioRepository;
    private usuarioService;
    constructor();
    getUsuarios: (req: Request, res: Response) => Promise<void>;
    createUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=usuario.controller.d.ts.map
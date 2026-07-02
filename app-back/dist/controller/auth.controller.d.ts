import type { Request, Response } from "express";
export declare class AuthController {
    private usuarioRepository;
    private usuarioService;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.controller.d.ts.map
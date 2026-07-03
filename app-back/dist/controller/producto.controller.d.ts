import type { Request, Response } from "express";
export declare class ProductoController {
    private repository;
    private productoService;
    getProductos: (req: Request, res: Response) => Promise<void>;
    getProductoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createProducto: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=producto.controller.d.ts.map
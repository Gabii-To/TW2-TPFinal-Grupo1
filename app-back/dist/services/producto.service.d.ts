import type { ProductoRepository } from "../repository/producto.repository.js";
export declare class ProductoService {
    private productoRepository;
    constructor(productoRepository: ProductoRepository);
    obtenerProductos(): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        usuario_id: number;
    }[]>;
    obtenerProducto(id: number): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        usuario_id: number;
    } | null>;
}
//# sourceMappingURL=producto.service.d.ts.map
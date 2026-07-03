import type { ProductoRepository } from "../repository/producto.repository.js";
export interface ProductoImagenInput {
    datos?: string;
    tipo_mime?: string;
}
export declare class ProductoService {
    private productoRepository;
    constructor(productoRepository: ProductoRepository);
    obtenerProductos(): Promise<({
        imagenes: {
            datos: string;
            tipo_mime: string;
            orden: number;
        }[];
    } & {
        id: number;
        nombre: string;
        usuario_id: number;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    obtenerProducto(id: number): Promise<({
        imagenes: {
            datos: string;
            tipo_mime: string;
            orden: number;
        }[];
    } & {
        id: number;
        nombre: string;
        usuario_id: number;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
    }) | null>;
    crearProducto(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        usuario_id: number;
        imagenes?: ProductoImagenInput[];
    }): Promise<{
        imagenes: {
            datos: string;
            tipo_mime: string;
            orden: number;
        }[];
    } & {
        id: number;
        nombre: string;
        usuario_id: number;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
    }>;
    private prepararImagenes;
    private normalizarImagen;
}
//# sourceMappingURL=producto.service.d.ts.map
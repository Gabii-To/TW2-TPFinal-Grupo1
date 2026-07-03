export interface ProductoImagenCreateData {
    datos: string;
    tipo_mime: string;
    orden: number;
}
export interface ProductoCreateData {
    nombre: string;
    descripcion: string;
    clasificacion: string;
    precio: number;
    usuario_id: number;
    imagenes?: ProductoImagenCreateData[];
}
export declare class ProductoRepository {
    findAllProductos(): Promise<({
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
    findProductoById(id: number): Promise<({
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
    create(data: ProductoCreateData): Promise<{
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
}
//# sourceMappingURL=producto.repository.d.ts.map
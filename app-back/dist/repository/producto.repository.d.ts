export declare class ProductoRepository {
    findAllProductos(): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        usuario_id: number;
    }[]>;
    findProductoById(id: number): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        usuario_id: number;
    } | null>;
    create(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        usuario_id: number;
    }): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        usuario_id: number;
    }>;
}
//# sourceMappingURL=producto.repository.d.ts.map
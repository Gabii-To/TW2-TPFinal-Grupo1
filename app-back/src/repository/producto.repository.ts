import {prisma} from "../prisma.js";

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

const includeImagenes = {
    imagenes: {
        orderBy: {
            orden: "asc" as const,
        },
    },
};

export class ProductoRepository {
    async findAllProductos() {
        console.log("[Back][ProductoRepository] findAllProductos");
        return await prisma.producto.findMany({
            orderBy: { id: "asc" },
            include: includeImagenes,
        });
    }

    async findProductoById(id: number) {
        console.log("[Back][ProductoRepository] findProductoById id:", id);
        return await prisma.producto.findUnique({
            where: { id },
            include: includeImagenes,
        });
    }

    async create(data: ProductoCreateData) {
        const { imagenes = [], ...productoData } = data;
        const dataCrear = imagenes.length
            ? {
                ...productoData,
                imagenes: { create: imagenes },
            }
            : productoData;

        return prisma.producto.create({
            data: dataCrear,
            include: includeImagenes,
        });
    }
}

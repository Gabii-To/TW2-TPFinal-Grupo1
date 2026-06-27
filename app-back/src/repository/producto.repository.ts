import { prisma } from "../prisma.js";

export class ProductoRepository {
    async findAllProductos() {
        console.log("[Back][ProductoRepository] findAllProductos");
        return await prisma.producto.findMany({
            orderBy: { id: "asc" },
        });
    }

    async findProductoById(id: number) {
        console.log("[Back][ProductoRepository] findProductoById id:", id);
        return await prisma.producto.findUnique({
            where: { id }
        });
    }

    async create(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        usuario_id: number;
    }) {

        return prisma.producto.create({
            data
        });
    }
}

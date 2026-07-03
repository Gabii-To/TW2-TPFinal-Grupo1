import { prisma } from "../prisma.js";
const includeImagenes = {
    imagenes: {
        select: {
            datos: true,
            tipo_mime: true,
            orden: true,
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
    async findProductoById(id) {
        console.log("[Back][ProductoRepository] findProductoById id:", id);
        return await prisma.producto.findUnique({
            where: { id },
            include: includeImagenes,
        });
    }
    async create(data) {
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
//# sourceMappingURL=producto.repository.js.map
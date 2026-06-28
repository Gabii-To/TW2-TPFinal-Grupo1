import { prisma } from "../prisma.js";
export class ProductoRepository {
    async findAllProductos() {
        console.log("[Back][ProductoRepository] findAllProductos");
        return await prisma.producto.findMany({
            orderBy: { id: "asc" },
        });
    }
    async findProductoById(id) {
        console.log("[Back][ProductoRepository] findProductoById id:", id);
        return await prisma.producto.findUnique({
            where: { id },
        });
    }
}
//# sourceMappingURL=producto.repository.js.map
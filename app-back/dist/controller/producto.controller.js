import { prisma } from "../prisma.js";
export class ProductoController {
    constructor() { }
    getProductos = async (req, res) => {
        try {
            const productos = await prisma.producto.findMany();
            res.status(200).json(productos);
        }
        catch (error) {
            res.status(500).json({ error: "No se encontraron productos" });
        }
    };
}
//# sourceMappingURL=producto.controller.js.map
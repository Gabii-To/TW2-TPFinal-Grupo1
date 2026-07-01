import { prisma } from "../prisma.js";
import { ProductoRepository } from "../repository/producto.repository.js";
import { ProductoService } from "../services/producto.service.js";
const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
export class ProductoController {
    constructor() { }
    getProductos = async (req, res) => {
        try {
            // const productos = await prisma.producto.findMany();
            const productos = await productoService.obtenerProductos();
            res.status(200).json(productos);
        }
        catch (error) {
            res.status(500).json({ error: "No se encontraron productos" });
        }
    };
}
//# sourceMappingURL=producto.controller.js.map
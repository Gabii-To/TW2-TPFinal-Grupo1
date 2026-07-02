import { ProductoRepository } from "../repository/producto.repository.js";
import { ProductoService } from "../services/producto.service.js";
export class ProductoController {
    repository = new ProductoRepository();
    productoService = new ProductoService(this.repository);
    getProductos = async (req, res) => {
        try {
            const productos = await this.productoService.obtenerProductos();
            res.status(200).json(productos);
        }
        catch {
            res.status(500).json({ error: "No se encontraron productos" });
        }
    };
    getProductoById = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "ID inválido" });
        try {
            const producto = await this.productoService.obtenerProducto(id);
            if (!producto)
                return res.status(404).json({ error: "Producto no encontrado" });
            res.status(200).json(producto);
        }
        catch {
            res.status(500).json({ error: "Error al buscar producto" });
        }
    };
    createProducto = async (req, res) => {
        try {
            const { nombre, descripcion, clasificacion, precio, usuario_id } = req.body;
            if (!nombre ||
                !descripcion ||
                !clasificacion ||
                !precio ||
                !usuario_id) {
                return res.status(400).json({
                    error: "Faltan datos obligatorios"
                });
            }
            const producto = await this.productoService.crearProducto({
                nombre,
                descripcion,
                clasificacion,
                precio: Number(precio),
                usuario_id: Number(usuario_id)
            });
            return res.status(201).json(producto);
        }
        catch (error) {
            console.error("CREATE PRODUCT ERROR:", error);
            return res.status(500).json({
                error: "Error al crear producto"
            });
        }
    };
}
//# sourceMappingURL=producto.controller.js.map
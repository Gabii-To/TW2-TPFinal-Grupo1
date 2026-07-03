import { ProductoRepository } from "../repository/producto.repository.js";
import type {Request, Response} from "express";
import {ProductoService} from "../services/producto.service.js";

export class ProductoController {

    private repository = new ProductoRepository();
    private productoService = new ProductoService(this.repository);

    public getProductos = async (req: Request, res: Response) => {
        try {
            const productos = await this.productoService.obtenerProductos();
            res.status(200).json(productos);
        } catch {
            res.status(500).json({ error: "No se encontraron productos" });
        }
    };

    public getProductoById = async (req: Request, res: Response) => {

        const id = Number(req.params.id);

        if (isNaN(id))
            return res.status(400).json({ error: "ID inválido" });

        try {
            const producto = await this.productoService.obtenerProducto(id);

            if (!producto)
                return res.status(404).json({ error: "Producto no encontrado" });

            res.status(200).json(producto);

        } catch {
            res.status(500).json({ error: "Error al buscar producto" });
        }
    };

    public createProducto = async (req: Request, res: Response) => {
        try {
            const {
                nombre,
                descripcion,
                clasificacion,
                precio,
                usuario_id,
                imagenes = []
            } = req.body;

            if (
                !nombre ||
                !descripcion ||
                !clasificacion ||
                !precio ||
                !usuario_id
            ) {
                return res.status(400).json({
                    error: "Faltan datos obligatorios"
                });
            }

            if (!Array.isArray(imagenes)) {
                return res.status(400).json({
                    error: "Las imágenes deben enviarse en un arreglo"
                });
            }

            const producto = await this.productoService.crearProducto({
                nombre,
                descripcion,
                clasificacion,
                precio: Number(precio),
                usuario_id: Number(usuario_id),
                imagenes
            });

            return res.status(201).json(producto);

        } catch (error) {
            console.error("CREATE PRODUCT ERROR:", error);

            return res.status(500).json({
                error: "Error al crear producto"
            });
        }
    };
}

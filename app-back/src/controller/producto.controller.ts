import type {Request, Response} from "express";
import {prisma} from "../prisma.js";

export class ProductoController {
    constructor() {}

    public getProductos = async (req: Request, res: Response) => {

        try {
            const productos = await prisma.producto.findMany();
            res.status(200).json(productos);
        } catch (error) {
                console.error(error);

            res.status(500).json({
                error: "No se encontraron productos",
                details: error
            });
        }
    }

    public getProductoById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                error: "ID inválido"
            });
        }

        const producto = await prisma.producto.findUnique({
            where: { id }
        });

        if (!producto) {
            
        }

        res.status(200).json(producto);

    } catch (error) {
        console.log("PRISMA ERROR BY ID:", error);

        res.status(500).json({
            error: "Error al buscar producto por id"
        });
    }
}

    public createProducto = async (req: Request, res: Response) => {
        try {
            const {
                nombre,
                descripcion,
                clasificacion,
                precio,
                usuario_id
            } = req.body;

            const producto = await prisma.producto.create({
                data: {
                    nombre,
                    descripcion,
                    clasificacion,
                    precio,
                    usuario_id
                }
            });

            res.status(201).json(producto);

        } catch (error) {

            res.status(500).json({
                error: "Error al crear producto"
            });
        }
    }
}
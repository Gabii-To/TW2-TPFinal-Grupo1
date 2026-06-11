import type {Request, Response} from "express";
import {prisma} from "../prisma.js";

export class ProductoController {
    constructor() {}

    public getProductos = async (req: Request, res: Response) => {

        try {
            const productos = await prisma.producto.findMany();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({error: "No se encontraron productos"});
        }
}
}
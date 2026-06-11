import {type Request, type Response} from "express";
import {prisma} from "../prisma.js";

export class UsuarioController {
    constructor() {}

    public getUsuarios = async (req: Request, res: Response) => {

        try {

            const usuarios = await prisma.usuario.findMany();

            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({error: "No se encontraron usuarios."})
        }
}
}
import {} from "express";
import { prisma } from "../prisma.js";
export class UsuarioController {
    constructor() { }
    getUsuarios = async (req, res) => {
        try {
            const usuarios = await prisma.usuario.findMany();
            res.status(200).json(usuarios);
        }
        catch (error) {
            res.status(500).json({ error: "No se encontraron usuarios." });
        }
    };
}
//# sourceMappingURL=usuario.controller.js.map
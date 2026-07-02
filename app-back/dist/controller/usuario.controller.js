import {} from "express";
import { prisma } from "../prisma.js";
import { UsuarioService } from "../services/usuario.service.js";
import { UsuarioRepository } from "../repository/usuario.repository.js";
export class UsuarioController {
    usuarioRepository = new UsuarioRepository();
    usuarioService = new UsuarioService(this.usuarioRepository);
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
    createUsuario = async (req, res) => {
        try {
            const nuevoUsuario = req.body;
            const usuario = await this.usuarioService.signup(nuevoUsuario);
            return res.status(200).json({
                mensaje: "Login exitoso",
                usuario
            });
        }
        catch (error) {
            console.log("EL ERROR REAL ES:", error); //cambiar?
            res.status(400).json({ error: error.message || "Error interno" });
        }
    };
}
//# sourceMappingURL=usuario.controller.js.map
import {type Request, type Response} from "express";
import {prisma} from "../prisma.js";
import { UsuarioService } from "../services/usuario.service.js";
import { UsuarioRepository } from "../repository/usuario.repository.js";
import type { Usuario } from "../models/usuario.model.js";

export class UsuarioController {

    private usuarioRepository = new UsuarioRepository();
    private usuarioService = new UsuarioService(this.usuarioRepository);

    constructor() {}

    public getUsuarios = async (req: Request, res: Response) => {

        try {

            const usuarios = await prisma.usuario.findMany();

            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({error: "No se encontraron usuarios."})
        }
}

public createUsuario = async (req: Request, res: Response) => {
    try {
        const nuevoUsuario: Usuario = req.body;

        const usuario = await this.usuarioService.signup(nuevoUsuario);

        return res.status(200).json({
        mensaje: "Login exitoso",
        usuario});

    } catch (error: any) {
        // 🚨 CAMBIO TEMPORAL DE DETECCIÓN:
        console.log("EL ERROR REAL ES:", error); // Esto lo obligará a salir en tu terminal de VS Code
        
        // Esto mandará el texto exacto del error a Postman (ej: "PasswordDebil", "EmailRepetido")
        res.status(400).json({ error: error.message || "Error interno" });
    }
}
}
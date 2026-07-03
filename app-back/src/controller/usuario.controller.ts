import {type Request, type Response} from "express";
import {prisma} from "../prisma.js";
import {UsuarioService} from "../services/usuario.service.js";
import {UsuarioRepository} from "../repository/usuario.repository.js";
import type {Usuario} from "../models/usuario.model.js";

export class UsuarioController {

    private usuarioRepository = new UsuarioRepository();
    private usuarioService = new UsuarioService(this.usuarioRepository);

    constructor() {
    }

    public getUsuarios = async (req: Request, res: Response) => {

        try {

            const usuarios = await prisma.usuario.findMany();

            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({error: "No se encontraron usuarios."})
        }
    }

    public getUsuarioPorId = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id))
            return res.status(400).json({ error: "ID de usuario invalido" });

        try {
            const usuario = await this.usuarioService.getDatosDeUsuario(id);

            if (!usuario)
                return res.status(404).json({ error: "Usuario no existente" });

            res.status(200).json(usuario);

        } catch {
            res.status(500).json({ error: "Error al buscar al usuario" });
        }
    }

    public editarUsuario = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id))
            return res.status(400).json({ error: "ID de usuario inválido" });

        try {
            const {email, nombre, apellido, direccion} = req.body;
            const usuario = await this.usuarioService.editarUsuario
            (id, {email, nombre, apellido, direccion});

            if (!usuario)
                return res.status(404).json({ error: "Usuario no existente" });

            res.status(200).json(usuario);

        } catch {
            res.status(500).json({ error: "Error al buscar al usuario" });
        }
    }

    public eliminarUsuario = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "ID de usuario invalido" });

        try {
            const usuarioEliminado = await this.usuarioService.eliminarUsuario(id);

            if (!usuarioEliminado) {
                return res.status(404).json({ error: "Usuario no existente" });
            }

            return res.status(200).json({
                message: "Usuario eliminado correctamente",
                usuario: usuarioEliminado
            });

        } catch {
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }
    }

    public createUsuario = async (req: Request, res: Response) => {
        try {
            const nuevoUsuario: Usuario = req.body;

            const usuario = await this.usuarioService.signup(nuevoUsuario);

            return res.status(200).json({
                mensaje: "Login exitoso",
                usuario
            });

        } catch (error: any) {

            console.log("EL ERROR REAL ES:", error); //cambiar?

            res.status(400).json({error: error.message || "Error al crear el usuario"});
        }
    }

    public cambiarPassword = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        try {
            const { passwordActual, passwordNueva } = req.body;

            const usuario = await this.usuarioService.cambiarPassword(
                id,
                passwordActual,
                passwordNueva
            );

            return res.status(200).json({
                message: "Contraseña actualizada correctamente",
                usuario
            });

        } catch (error: any) {
            return res.status(400).json({
                error: error.message || "Error al cambiar contraseña"
            });
        }
    };
    public recuperarClave = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const resultado = await this.usuarioService.enlaceRecuperarClave(email);

            res.status(200).json(resultado);

        } catch (error: any) {
            if (error.message === "UsuarioNoEncontrado") {
                return res.status(404).json({ error: "No existe ningún usuario registrado con este correo." });
            }
            res.status(400).json({ error: error.message || "Error al recuperar la clave" });
        }
    }

    public renovarClave = async (req: Request, res: Response) => {
        try {
            const { token, password } = req.body;
            const resultado = await this.usuarioService.renovarClaveConToken(token, password);
            return res.status(200).json(resultado);
        } catch (error: any) {
            return res.status(400).json({ error: error.message || "Error al renovar  la clave" });
        }
    }

}
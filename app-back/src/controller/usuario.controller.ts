import { type Request, type Response } from "express";
import {UsuarioRepository} from "../Repositorios/usuario.repository.js";

export class UsuarioController {

    private usuarioRepository = new UsuarioRepository();

    public getUsuarios = async (_req: Request, res: Response) => {

        try {

            const usuarios = await this.usuarioRepository.getUsuarios();

            return res.status(200).json(usuarios);

        } catch {

            return res.status(500).json({
                error: "No se encontraron usuarios."
            });

        }

    }

    public getUsuarioPorId = async (req: Request, res: Response) => {

        try {

            const id = Number(req.params.id);

            const usuario = await this.usuarioRepository.getUsuarioPorId(id);

            return res.status(200).json(usuario);

        } catch (error: any) {

            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({
                    error: "Usuario no encontrado."
                });
            }

            return res.status(500).json({
                error: "Error al buscar el usuario."
            });

        }

    }

    public crearUsuario = async (req: Request, res: Response) => {

        try {

            const { email, password, nombre, apellido, direccion } = req.body;

            const usuario = await this.usuarioRepository.crearUsuario(
                email,
                password,
                nombre,
                apellido,
                direccion
            );

            return res.status(201).json(usuario);

        } catch (error: any) {

            if (error.message === "EMAIL_EXISTS") {
                return res.status(409).json({
                    error: "El email ya se encuentra registrado."
                });
            }

            return res.status(500).json({
                error: "No se pudo crear el usuario."
            });

        }

    }

    public editarUsuario = async (req: Request, res: Response) => {

        try {

            const id = Number(req.params.id);

            const { email, nombre, apellido, direccion } = req.body;

            const usuario = await this.usuarioRepository.editarUsuario(
                id,
                email,
                nombre,
                apellido,
                direccion
            );

            return res.status(200).json(usuario);

        } catch (error: any) {

            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({
                    error: "Usuario no encontrado."
                });
            }

            return res.status(500).json({
                error: "No se pudo actualizar el usuario."
            });

        }

    }

    public eliminarUsuario = async (req: Request, res: Response) => {

        try {

            const id = Number(req.params.id);

            await this.usuarioRepository.eliminarUsuario(id);

            return res.status(200).json({
                mensaje: "Usuario eliminado correctamente."
            });

        } catch (error: any) {

            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({
                    error: "Usuario no encontrado."
                });
            }

            return res.status(500).json({
                error: "No se pudo eliminar el usuario."
            });

        }

    }
}
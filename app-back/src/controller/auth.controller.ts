import type { Request, Response } from "express";
import {AuthRepository} from "../Repositorios/auth.repository.js";

export class AuthController {

    private authRepository = new AuthRepository();

    public login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;

            const usuario = await this.authRepository.login(email, password);

            return res.status(200).json({
                mensaje: "Login exitoso",
                usuario
            });

        } catch (error: any) {

            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }

            if (error.message === "INVALID_PASSWORD") {
                return res.status(401).json({
                    error: "Contraseña incorrecta"
                });
            }

            return res.status(500).json({
                error: "Error interno del servidor"
            });

        }

    }

    public register = async (req: Request, res: Response) => {

        try {

            const { email, password, nombre, apellido, direccion } = req.body;

            const usuario = await this.authRepository.register(
                email,
                password,
                nombre,
                apellido,
                direccion
            );

            return res.status(201).json({
                mensaje: "Usuario registrado correctamente",
                usuario
            });

        } catch (error: any) {

            if (error.message === "EMAIL_EXISTS") {
                return res.status(409).json({
                    error: "El email ya está registrado"
                });
            }

            return res.status(500).json({
                error: "Error interno del servidor"
            });

        }

    }

    public cambiarPassword = async (req: Request, res: Response) => {

        try {

            const { id, passwordActual, passwordNueva } = req.body;

            await this.authRepository.cambiarPassword(
                id,
                passwordActual,
                passwordNueva
            );

            return res.status(200).json({
                mensaje: "Contraseña actualizada correctamente"
            });

        } catch (error: any) {

            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }

            if (error.message === "INVALID_PASSWORD") {
                return res.status(401).json({
                    error: "La contraseña actual es incorrecta"
                });
            }

            return res.status(500).json({
                error: "Error interno del servidor"
            });

        }

    }

    public logout = async (_req: Request, res: Response) => {

        return res.status(200).json({
            mensaje: "Logout exitoso"
        });

    }
}
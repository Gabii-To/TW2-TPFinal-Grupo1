import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export class AuthController {

    public login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;

            const usuario = await prisma.usuario.findFirst({
                where: {
                    email: email
                }
            });

            if (!usuario) {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }

            if (usuario.password !== password) {
                return res.status(401).json({
                    error: "Contraseña incorrecta"
                });
            }

            return res.status(200).json({
                mensaje: "Login exitoso",
                usuario
            });

        } catch (error) {

            return res.status(500).json({
                error: "Error interno del servidor"
            });

        }
    };

    public logout = async (req: Request, res: Response) => {

        return res.status(200).json({
            mensaje: "Logout exitoso"
        });

    };
}
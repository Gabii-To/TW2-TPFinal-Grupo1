import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
export class AuthController {
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const usuario = await prisma.usuario.findFirst({
                where: {
                    email: email
                }
            });
            if (!usuario) {
                console.log("Usuario no encontrado");
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }
            if (!await bcrypt.compare(password, usuario.password)) {
                console.log("Contraseña incorrecta");
                return res.status(401).json({
                    error: "Contraseña incorrecta"
                });
            }
            console.log("Login exitoso");
            return res.status(200).json({
                mensaje: "Login exitoso",
                usuario
            });
        }
        catch (error) {
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    };
    logout = async (req, res) => {
        return res.status(200).json({
            mensaje: "Logout exitoso"
        });
    };
}
//# sourceMappingURL=auth.controller.js.map
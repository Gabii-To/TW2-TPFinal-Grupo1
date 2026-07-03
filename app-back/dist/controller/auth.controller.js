import { UsuarioService } from "../services/usuario.service.js";
import { UsuarioRepository } from "../repository/usuario.repository.js";
export class AuthController {
    usuarioRepository = new UsuarioRepository();
    usuarioService = new UsuarioService(this.usuarioRepository);
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const usuario = await this.usuarioService.signin(email, password);
            if (!usuario) {
                console.log("Usuario no encontrado");
                return res.status(404).json({
                    error: "Usuario no encontrado",
                });
            }
            console.log("Login exitoso");
            return res.status(200).json({
                mensaje: "Login exitoso",
                usuario,
            });
        }
        catch (error) {
            if (error instanceof Error &&
                error.message === "EmailPasswordObligatorios") {
                return res.status(400).json({
                    error: "El email y la contraseña son obligatorios",
                });
            }
            if (error instanceof Error && error.message === "CredencialesInvalidas") {
                return res.status(401).json({
                    error: "Credenciales inválidas",
                });
            }
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    };
    logout = async (req, res) => {
        return res.status(200).json({
            mensaje: "Logout exitoso",
        });
    };
}
//# sourceMappingURL=auth.controller.js.map
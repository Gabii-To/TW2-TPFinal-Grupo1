import {Router} from "express";
import {UsuarioController} from "../../controller/usuario.controller.js";

const usuarioRouter = Router();

const usuarioController = new UsuarioController();

usuarioRouter.get("/", usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.post("/register", usuarioController.createUsuario.bind(usuarioController));
usuarioRouter.get("/:id", usuarioController.getUsuarioPorId.bind(usuarioController));
usuarioRouter.put("/:id", usuarioController.editarUsuario.bind(usuarioController));
usuarioRouter.delete("/:id", usuarioController.eliminarUsuario.bind(usuarioController));
usuarioRouter.put("/password/:id", usuarioController.cambiarPassword.bind(usuarioController));
usuarioRouter.post("/recuperar-clave", usuarioController.recuperarClave.bind(usuarioController));
usuarioRouter.post("/renovar-clave", usuarioController.renovarClave.bind(usuarioController));

export default usuarioRouter;
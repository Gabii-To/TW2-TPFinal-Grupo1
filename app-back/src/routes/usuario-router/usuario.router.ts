import {Router} from "express";
import {UsuarioController} from "../../controller/usuario.controller.js";

const usuarioRouter = Router();

const usuarioController = new UsuarioController();

usuarioRouter.get("/", usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.post("/register", usuarioController.createUsuario.bind(usuarioController));
usuarioRouter.post("/recuperar-clave", usuarioController.recuperarClave.bind(usuarioController));
usuarioRouter.post("/renovar-clave", usuarioController.renovarClave.bind(usuarioController));

export default usuarioRouter;
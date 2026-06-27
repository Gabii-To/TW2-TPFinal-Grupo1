import {Router} from "express";
import {UsuarioController} from "../../controller/usuario.controller.js";

const usuarioRouter = Router();

const usuarioController = new UsuarioController();

usuarioRouter.get("/", usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get("/:id", usuarioController.getUsuarioPorId);
usuarioRouter.put("/:id", usuarioController.editarUsuario);

export default usuarioRouter;
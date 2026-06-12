import {Router} from "express";
import UsuarioRouter from "./usuario-router/usuario.router.js";
import ProductoRouter from "./producto-router/producto.router.js";
import LoginRouter from "./login-router/login.router.js";

export class AppRoutes {
    static get routes():Router {
        const router = Router();

        router.use("/api/usuarios", UsuarioRouter)
        router.use("/api/productos", ProductoRouter)
        router.use(LoginRouter)

        return router;
    }
}
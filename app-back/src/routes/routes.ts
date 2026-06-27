import {Router} from "express";
import UsuarioRouter from "./usuario-router/usuario.router.js";
import ProductoRouter from "./producto-router/producto.router.js";
import AuthRouter from "./auth-router/auth.router.js";

export class AppRoutes {
    static get routes():Router {
        const router = Router();

        router.use("/api/usuarios", UsuarioRouter)
        router.use("/api/productos", ProductoRouter)
        router.use("/api/auth", AuthRouter)

        return router;
    }
}
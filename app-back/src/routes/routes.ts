import { Router } from "express";
import UsuarioRouter from "./usuario-router/usuario.router.js";
import ProductoRouter from "./producto-router/producto.router.js";
import LoginRouter from "./login-router/login.router.js";
import CarritoRouter from "./carrito-router/carrito.router.js";
import PedidoRouter from "./pedido-router/pedido-router.js";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/usuarios", UsuarioRouter)
        router.use("/api/productos", ProductoRouter)
        router.use("/api/auth/login", LoginRouter)
        router.use("/api/carrito", CarritoRouter)
        router.use("/api/pedidos", PedidoRouter)

        return router;
    }
}
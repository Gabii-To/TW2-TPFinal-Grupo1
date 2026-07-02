import { Router } from "express";
import { CarritoController } from "../../controller/carrito.controller.js";

// import {AuthController} from "../../controller/auth.controller.js";

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get('/', carritoController.verCarrito);
carritoRouter.post('/items', carritoController.agregarProductoAlCarrito);
carritoRouter.patch('/items/:productoId', carritoController.actualizarCantidadProducto);
carritoRouter.delete('/items/:productoId', carritoController.quitarProductoDelCarrito);
carritoRouter.delete('/', carritoController.vaciarCarrito);
carritoRouter.post('/confirmar', carritoController.confirmarPedido);

export default carritoRouter;

// router.get("/", carritoController.obtenerCarrito);
// router.post("/agregar", carritoController.agregarAlCarrito);
// router.post("/finalizar", carritoController.finalizarCompra);

// export default router;
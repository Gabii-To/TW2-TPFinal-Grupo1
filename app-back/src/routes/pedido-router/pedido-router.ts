import { Router } from "express";
import { PedidoController } from "../../controller/pedido.controller.js";

const pedidoRouter = Router();
const pedidoController = new PedidoController();


pedidoRouter.get('/', pedidoController.listarPedidos);
pedidoRouter.get('/:id', pedidoController.verPedido);
pedidoRouter.post('/:id/pagar', pedidoController.iniciarPago);
pedidoRouter.put('/:id/confirmar-pago', pedidoController.pagarPedido);
pedidoRouter.put('/:id/cancelar', pedidoController.cancelarPedido);

export default pedidoRouter;
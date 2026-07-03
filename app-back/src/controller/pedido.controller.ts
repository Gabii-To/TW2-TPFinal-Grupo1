import { PedidoRepository } from "../repository/pedido.repository.js";
import { PedidoService } from "../services/pedido.service.js";
import { type Request, type Response } from 'express'
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from '../repository/producto.repository.js';
import {MercadopagoService} from "../services/mercadopago.service.js";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const pedidoRepository = new PedidoRepository();
const mercadopagoService = new MercadopagoService();
const pedidoService = new PedidoService(pedidoRepository, productoService, mercadopagoService);

export class PedidoController {
    //public getEmpleados = async (req: Request, res: Response) =>
    listarPedidos = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const pedidos = await pedidoService.listarPedidos(usuarioId);
            res.status(200).json(pedidos);
        } catch (error: any) {
            res.status(500).json({ mensaje: 'Error al listar pedidos', error: error.message });
        }
    }

    verPedido = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const id = Number(req.params.id);

            const pedido = await pedidoService.verPedido(usuarioId, id);
            if (!pedido) {
                res.status(404).json({ mensaje: 'Pedido no encontrado' });
                return;
            }
            res.status(200).json(pedido);
        } catch (error: any) {
            res.status(500).json({ mensaje: 'Error al obtener el pedido', error: error.message });
        }
    }

    cancelarPedido = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const id = Number(req.params.id);

            const pedido = await pedidoService.cancelarPedido(usuarioId, id);
            res.status(200).json(pedido);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }

    iniciarPago = async (req: Request, res: Response) => {
        try {
            const usuarioId = Number(req.query.usuarioId);
            const id = Number(req.params.id);

            const preferencia = await pedidoService.iniciarPago(usuarioId, id);
            res.status(200).json(preferencia);
        } catch (error: any) {
            res.status(400).json({mensaje: error.message});
        }
    }

    pagarPedido = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const id = Number(req.params.id);

            const pedido = await pedidoService.pagarPedido(usuarioId, id);
            res.status(200).json(pedido);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }
}



//vaciarCarrito?? (al final creé otro controller para Carrito pero que consume el servicio de pedido)

//pagarpedido??


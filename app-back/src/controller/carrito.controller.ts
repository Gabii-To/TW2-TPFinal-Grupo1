import { PedidoService } from '../services/pedido.service.js';
import { PedidoRepository } from "../repository/pedido.repository.js";
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from '../repository/producto.repository.js';

import type { Request, Response } from 'express';


const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const pedidoRepository = new PedidoRepository();
const pedidoService = new PedidoService(pedidoRepository, productoService);

export class CarritoController {

    verCarrito = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const carrito = await pedidoService.obtenerCarrito(usuarioId);
            res.status(200).json(carrito);
        } catch (error: any) {
            res.status(500).json({ mensaje: 'Error al obtener el carrito', error: error.message });
        }
    }

    agregarProductoAlCarrito = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const { productoId, cantidad } = req.body;

            if (!usuarioId || !productoId || !cantidad || cantidad <= 0) {
                res.status(400).json({ mensaje: 'productoId y cantidad >0 son requeridos' });
                return;
            }

            const carrito = await pedidoService.agregarProducto(usuarioId, Number(productoId), Number(cantidad));
            res.status(200).json(carrito);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }

    actualizarCantidadProducto = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const productoId = Number(req.params.productoId);
            const { cantidad } = req.body;

            if (!usuarioId || !productoId || !cantidad || cantidad <= 0) {
                res.status(400).json({ mensaje: 'usuarioId, productoId y cantidad >0 son requeridos' });
                return;
            }

            const carrito = await pedidoService.actualizarCantidadProducto(usuarioId, productoId, Number(cantidad));
            res.status(200).json(carrito);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }
    quitarProductoDelCarrito = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const productoId = Number(req.params.productoId);

            const carrito = await pedidoService.quitarProducto(usuarioId, productoId);
            res.status(200).json(carrito);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }

    vaciarCarrito = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            await pedidoService.vaciarCarrito(usuarioId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }

    confirmarPedido = async (req: Request, res: Response) => {
        try {
            //   const usuarioId = req.usuario!.id;
            const usuarioId = Number(req.query.usuarioId)
            const pedido = await pedidoService.confirmarPedido(usuarioId);
            res.status(200).json(pedido);
        } catch (error: any) {
            res.status(400).json({ mensaje: error.message });
        }
    }

}
//     private carritoRepository = new CarritoRepository();
//     private carritoService = new CarritoService();

//     async obtenerCarrito(req: Request, res: Response) {
//         try {
//             const usuarioId = req.query.usuarioId as string;
//             const carrito = await CarritoService.obtenerCarrito(usuarioId);
//             res.json(carrito);
//         } catch (error) {
//             res.status(500).json({ error: 'Error al obtener el carrito' });
//         }
//     }

//     async agregarAlCarrito(req: Request, res: Response) {
//         try {
//             const { usuarioId, productoId } = req.body;
//             await CarritoService.agregarAlCarrito(usuarioId, productoId);
//             res.json({ message: 'Producto agregado al carrito' });
//         } catch (error) {
//             res.status(500).json({ error: 'Error al agregar el producto al carrito' });
//         }
//     }

//     async finalizarCompra(req: Request, res: Response) {
//         try {
//             const { usuarioId } = req.body;
//             await CarritoService.finalizarCompra(usuarioId);
//             res.json({ message: 'Compra finalizada' });
//         } catch (error) {
//             res.status(500).json({ error: 'Error al finalizar la compra' });
//         }
//     }
// }
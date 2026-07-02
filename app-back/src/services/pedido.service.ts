import { PedidoRepository } from '../repository/pedido.repository.js';
import { ProductoService } from './producto.service.js';
import { EstadoPedido } from '../models/estado-pedido.model.js';

export class PedidoService {

    constructor(
        private pedidoRepository: PedidoRepository,
        private productoService: ProductoService
    ) { }

    //CARRITO

    async obtenerCarrito(usuarioId: number) {
        let carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId);
        if (!carrito) {
            carrito = await this.pedidoRepository.crearCarrito(usuarioId);
        }
        return carrito;
    }

    async crearCarrito(usuarioId: number) {
        let carrito = await this.pedidoRepository.crearCarrito(usuarioId)
        return carrito;
    }

    async agregarProducto(usuarioId: number, productoId: number, cantidad: number) {
        const carrito = await this.obtenerCarrito(usuarioId);
        const producto = await this.productoService.obtenerProducto(productoId);
        if (!producto) throw new Error('Producto no encontrado');

        const itemExistente = await this.pedidoRepository.buscarItem(carrito!.id, productoId);
        if (itemExistente) {
            await this.pedidoRepository.actualizarCantidadItem(
                itemExistente.id,
                itemExistente.cantidad + cantidad,
                Number(producto.precio)
            );
        } else {
            await this.pedidoRepository.agregarItem(carrito!.id, productoId, cantidad, Number(producto.precio));
        }

        return this.recalcularTotal(carrito!.id);
    }

    async quitarProducto(usuarioId: number, productoId: number) {
        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId);
        if (!carrito) {
            throw new Error('No existe un carrito activo')
        } else {
            await this.pedidoRepository.eliminarItem(carrito.id, productoId);
        }
        return this.recalcularTotal(carrito.id);
    }

    async actualizarCantidadProducto(usuarioId: number, productoId: number, cantidad: number) {
        if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0');

        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId);
        if (!carrito) throw new Error('No existe un carrito activo');

        const producto = await this.productoService.obtenerProducto(productoId);
        if (!producto) throw new Error('Producto no encontrado');

        const itemExistente = await this.pedidoRepository.buscarItem(carrito.id, productoId);
        if (!itemExistente) throw new Error('El producto no existe en el carrito');

        await this.pedidoRepository.actualizarCantidadItem(
            itemExistente.id,
            cantidad,
            Number(producto.precio)
        );

        return this.recalcularTotal(carrito.id);
    }
    async vaciarCarrito(usuarioId: number) {
        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId);
        if (!carrito) return;
        await this.pedidoRepository.vaciarItems(carrito.id);
        await this.pedidoRepository.actualizarTotal(carrito.id, 0);
    }

    //PEDIDOS


    //acá cambia de estado de Carrito a Pendiente (pasa de ser carrito a pedido)
    async confirmarPedido(usuarioId: number) {
        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId);
        if (!carrito) throw new Error('No hay carrito activo');

        const carritoCompleto = await this.pedidoRepository.buscarPorId(carrito.id);
        if (!carritoCompleto || carritoCompleto.productos.length === 0) {
            throw new Error('No se puede confirmar un carrito vacío');
        }

        return this.pedidoRepository.actualizarEstado(carrito.id, EstadoPedido.PENDIENTE);
    }

    //acá cambia de estado de Pendiente a Pago
    async pagarPedido(usuarioId: number, pedidoId: number) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        if (!pedido || pedido.usuario_id !== usuarioId) throw new Error('Pedido no encontrado');

        if (pedido.estado !== EstadoPedido.PENDIENTE) {
            throw new Error(`No se puede pagar un pedido en estado "${pedido.estado}"`);
        }
        // Acá habria que integrar la pasarela de pago
        return this.pedidoRepository.actualizarEstado(pedidoId, EstadoPedido.PAGO);
    }

    //acá cambia de Pendiente a Cancelado
    async cancelarPedido(usuarioId: number, pedidoId: number) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        if (!pedido || pedido.usuario_id !== usuarioId) throw new Error('Pedido no encontrado');

        if (pedido.estado !== EstadoPedido.PENDIENTE) {
            throw new Error(`No se puede cancelar un pedido en estado "${pedido.estado}"`);
        }
        return this.pedidoRepository.actualizarEstado(pedidoId, EstadoPedido.CANCELADO);
    }

    async listarPedidos(usuarioId: number) {
        return this.pedidoRepository.listarPorUsuario(usuarioId);
    }

    async verPedido(usuarioId: number, pedidoId: number) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        if (!pedido || pedido.usuario_id !== usuarioId) return null;
        return pedido;
    }

    //esto se usa en agregarProducto
    private async recalcularTotal(pedidoId: number) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const total = pedido!.productos.reduce((acc, item) => acc + Number(item.subtotal), 0);
        return this.pedidoRepository.actualizarTotal(pedidoId, total);
    }
}
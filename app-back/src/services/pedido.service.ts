import { PedidoRepository } from '../repository/pedido.repository.js';
import { ProductoService } from './producto.service.js';
import { EstadoPedido } from '../models/estado-pedido.model.js';

export class PedidoService {

    constructor(private pedidoRepository: PedidoRepository, private productoService: ProductoService) { }

    //CARRITO

    async obtenerCarrito(usuarioId: number) {
        let carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId, EstadoPedido.CARRITO);
        if (!carrito) {
            carrito = await this.pedidoRepository.crearCarrito({
                usuario_id: usuarioId,
                estado: EstadoPedido.CARRITO,
                precio_total: 0,
            });
        }
        return carrito;
    }

    async crearCarrito(usuarioId: number) {
        let carrito = await this.pedidoRepository.crearCarrito({
            usuario_id: usuarioId,
            estado: EstadoPedido.CARRITO,
            precio_total: 0,
        })
        return carrito;
    }

    async agregarProducto(usuarioId: number, productoId: number, cantidad: number) {
        const carrito = await this.obtenerCarrito(usuarioId);
        const producto = await this.productoService.obtenerProducto(productoId);
        if (!producto) throw new Error('Producto no encontrado');

        const itemExistente = await this.pedidoRepository.buscarItem(carrito!.id, productoId);
        const precioUnitario = Number(producto.precio);

        if (itemExistente) {
            const nuevaCantidad = itemExistente.cantidad + cantidad;

            await this.pedidoRepository.actualizarCantidadItem(itemExistente.id, {
                cantidad: nuevaCantidad,
                subtotal: this.calcularSubtotal(nuevaCantidad, precioUnitario),
            });
        } else {
            await this.pedidoRepository.agregarItem({
                pedido_id: carrito!.id,
                producto_id: productoId,
                cantidad,
                precio_unitario: precioUnitario,
                subtotal: this.calcularSubtotal(cantidad, precioUnitario),
            });
        }

        return this.recalcularTotal(carrito!.id);
    }

    async quitarProducto(usuarioId: number, productoId: number) {
        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId, EstadoPedido.CARRITO);
        if (!carrito) {
            throw new Error('No existe un carrito activo')
        } else {
            await this.pedidoRepository.eliminarItem(carrito.id, productoId);
        }
        return this.recalcularTotal(carrito.id);
    }

    async actualizarCantidadProducto(usuarioId: number, productoId: number, cantidad: number) {
        if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0');

        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId, EstadoPedido.CARRITO);
        if (!carrito) throw new Error('No existe un carrito activo');

        const producto = await this.productoService.obtenerProducto(productoId);
        if (!producto) throw new Error('Producto no encontrado');

        const itemExistente = await this.pedidoRepository.buscarItem(carrito.id, productoId);
        if (!itemExistente) throw new Error('El producto no existe en el carrito');

        const precioUnitario = Number(producto.precio);

        await this.pedidoRepository.actualizarCantidadItem(itemExistente.id, {
            cantidad,
            subtotal: this.calcularSubtotal(cantidad, precioUnitario),
        });

        return this.recalcularTotal(carrito.id);
    }
    async vaciarCarrito(usuarioId: number) {
        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId, EstadoPedido.CARRITO);
        if (!carrito) return;
        await this.pedidoRepository.vaciarItems(carrito.id);
        await this.pedidoRepository.actualizarTotal(carrito.id, 0);
    }

    //PEDIDOS


    //acá cambia de estado de Carrito a Pendiente (pasa de ser carrito a pedido)
    async confirmarPedido(usuarioId: number) {
        const carrito = await this.pedidoRepository.buscarCarritoActivo(usuarioId, EstadoPedido.CARRITO);
        if (!carrito) throw new Error('No hay carrito activo');

        const carritoCompleto = await this.pedidoRepository.buscarPorId(carrito.id);
        if (!carritoCompleto || !carritoCompleto.productos || carritoCompleto.productos.length === 0) {
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
        // Acá habría que integrar la pasarela de pago
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
        return this.pedidoRepository.listarPorUsuario(usuarioId, EstadoPedido.CARRITO);
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

    private calcularSubtotal(cantidad: number, precioUnitario: number) {
        return cantidad * precioUnitario;
    }
}

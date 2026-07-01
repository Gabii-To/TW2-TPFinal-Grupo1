import { prisma } from '../prisma.js'
import { EstadoPedido } from '@prisma/client';

export class PedidoRepository {

    async crearCarrito(usuarioId: number) {
        return prisma.pedido.create({
            data: {
                usuario_id: usuarioId,
                estado: EstadoPedido.CARRITO,
                precio_total: 0,
            }, include: { productos: { include: { producto: true } } },
        });
    }

    async buscarCarritoActivo(usuarioId: number) {
        return prisma.pedido.findFirst({
            where: { usuario_id: usuarioId, estado: EstadoPedido.CARRITO },
            include: { productos: { include: { producto: true } } },
        });
    }

    async buscarPorId(id: number) {
        return prisma.pedido.findUnique({
            where: { id },
            include: { productos: { include: { producto: true } } },
        });
    }

    async listarPorUsuario(usuarioId: number) {
        return prisma.pedido.findMany({
            where: { usuario_id: usuarioId, estado: { not: EstadoPedido.CARRITO } },
            include: { productos: { include: { producto: true } } },
            orderBy: { fecha_creacion: 'desc' },
        });
    }

    async actualizarEstado(id: number, estado: EstadoPedido) {
        return prisma.pedido.update({ where: { id }, data: { estado } });
    }

    async actualizarTotal(id: number, total: number) {
        return prisma.pedido.update({ where: { id }, data: { precio_total: total } });
    }

    // --- items del pedido/carrito ---
    async buscarItem(pedidoId: number, productoId: number) {
        return prisma.producto_pedido.findFirst({
            where: { pedido_id: pedidoId, producto_id: productoId },
        });
    }

    async agregarItem(pedidoId: number, productoId: number, cantidad: number, precioUnitario: number) {
        return prisma.producto_pedido.create({
            data: {
                pedido_id: pedidoId,
                producto_id: productoId,
                cantidad,
                precio_unitario: precioUnitario,
                subtotal: cantidad * precioUnitario,
            },
        });
    }

    async actualizarCantidadItem(itemId: number, cantidad: number, precioUnitario: number) {
        return prisma.producto_pedido.update({
            where: { id: itemId },
            data: { cantidad, subtotal: cantidad * precioUnitario },
        });
    }

    async eliminarItem(pedidoId: number, productoId: number) {
        return prisma.producto_pedido.deleteMany({
            where: { pedido_id: pedidoId, producto_id: productoId },
        });
    }

    async vaciarItems(pedidoId: number) {
        return prisma.producto_pedido.deleteMany({ where: { pedido_id: pedidoId } });
    }
}
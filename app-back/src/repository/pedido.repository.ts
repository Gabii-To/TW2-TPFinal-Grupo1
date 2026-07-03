import { prisma } from '../prisma.js'
import type { EstadoPedidoValue } from '../models/estado-pedido.model.js';

const includePedidoCompleto = {
    productos: {
        include: {
            producto: {
                include: {
                    imagenes: {
                        orderBy: {
                            orden: 'asc' as const,
                        },
                    },
                },
            },
        },
    },
};

export class PedidoRepository {

    async crearCarrito(data: {
        usuario_id: number;
        estado: EstadoPedidoValue;
        precio_total: number;
    }) {
        return prisma.pedido.create({
            data,
            include: includePedidoCompleto,
        });
    }

    async buscarCarritoActivo(usuarioId: number, estado: EstadoPedidoValue) {
        return prisma.pedido.findFirst({
            where: { usuario_id: usuarioId, estado },
            include: includePedidoCompleto,
        });
    }

    async buscarPorId(id: number) {
        return prisma.pedido.findUnique({
            where: { id },
            include: includePedidoCompleto,
        });
    }

    async listarPorUsuario(usuarioId: number, estadoExcluido: EstadoPedidoValue) {
        return prisma.pedido.findMany({
            where: { usuario_id: usuarioId, estado: { not: estadoExcluido } },
            include: includePedidoCompleto,
            orderBy: { fecha_creacion: 'desc' },
        });
    }

    async actualizarEstado(id: number, estado: EstadoPedidoValue) {
        return prisma.pedido.update({
            where: { id },
            data: { estado },
            include: includePedidoCompleto,
        });
    }

    async actualizarTotal(id: number, total: number) {
        return prisma.pedido.update({
            where: { id },
            data: { precio_total: total },
            include: includePedidoCompleto,
        });
    }

    // --- items del pedido/carrito ---
    async buscarItem(pedidoId: number, productoId: number) {
        return prisma.producto_pedido.findFirst({
            where: { pedido_id: pedidoId, producto_id: productoId },
        });
    }

    async agregarItem(data: {
        pedido_id: number;
        producto_id: number;
        cantidad: number;
        precio_unitario: number;
        subtotal: number;
    }) {
        return prisma.producto_pedido.create({
            data,
        });
    }

    async actualizarCantidadItem(itemId: number, data: {
        cantidad: number;
        subtotal: number;
    }) {
        return prisma.producto_pedido.update({
            where: { id: itemId },
            data,
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

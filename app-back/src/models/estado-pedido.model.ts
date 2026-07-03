export const EstadoPedido = {
    CARRITO: 'CARRITO',
    PENDIENTE: 'PENDIENTE',
    PAGO: 'PAGO',
    CANCELADO: 'CANCELADO',
} as const;

export type EstadoPedidoValue = typeof EstadoPedido[keyof typeof EstadoPedido];
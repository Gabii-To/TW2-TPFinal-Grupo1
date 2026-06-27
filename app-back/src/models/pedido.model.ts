import { Producto } from "./producto.model.js";

export class Pedido {
    id!: number
    usuarioId!: string
    estado!: string
    productos!: Producto
    fechaCreacion!: Date
    fechaActualizacion!: Date
}

export enum EstadoPedido {
    PENDIENTE = 'Pendiente',
    EN_PROCESO = 'En proceso',
    COMPLETADO = 'Completado',
    CANCELADO = 'Cancelado'
}
export interface PedidoProducto {
  id: number;
  id_producto: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

export interface Pedido {
  id: number;
  usuario_id: number;
  fecha: string;
  estado: EstadoPedido;
  productos: PedidoProducto[];
  total: number;
}

export enum EstadoPedido {
  PENDIENTE = 'Pendiente',
  EN_PROCESO = 'En proceso',
  COMPLETADO = 'Completado',
  CANCELADO = 'Cancelado'
}

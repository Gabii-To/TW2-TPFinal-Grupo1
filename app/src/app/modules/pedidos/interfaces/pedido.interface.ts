import { Producto } from '../../productos/interfaces/producto.interface';

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
  fecha_creacion: string;
  fecha_actualizacion?: string;
  estado: EstadoPedido;
  productos: PedidoProducto[];
  precio_total: number;
}

export interface PedidoBackend {
  id: number;
  usuario_id: number;
  fecha_creacion: string;
  fecha_actualizacion?: string;
  estado: EstadoPedido;
  precio_total: number | string;
  productos: PedidoProductoBackend[];
}

export interface PedidoProductoBackend {
  id: number;
  producto_id: number;
  pedido_id: number;
  precio_unitario: number | string;
  cantidad: number;
  subtotal: number | string;
  producto: Producto;
}

export enum EstadoPedido {
  CARRITO = 'CARRITO',
  PENDIENTE = 'PENDIENTE',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO'
}
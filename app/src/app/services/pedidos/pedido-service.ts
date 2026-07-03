import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment.development';
import { Observable, map } from "rxjs";
import { Pedido, PedidoBackend } from './../../modules/pedidos/interfaces/pedido.interface';

export interface PreferenciaPago {
  preferenceId: string;
  init_point: string;
}

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  obtenerCarrito(usuarioId: number): Observable<Pedido> {
    return this.http
      .get<PedidoBackend>(`${environment.API_URL}/carrito?usuarioId=${usuarioId}`)
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  confirmarPedido(usuarioId: number): Observable<Pedido> {
    return this.http
      .post<PedidoBackend>(`${environment.API_URL}/carrito/confirmar?usuarioId=${usuarioId}`, {})
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  listarPedidos(usuarioId: number): Observable<Pedido[]> {
    return this.http
      .get<PedidoBackend[]>(`${environment.API_URL}/pedidos?usuarioId=${usuarioId}`)
      .pipe(map((pedidos) => pedidos.map((pedido) => this.mapearPedido(pedido))));
  }

  iniciarPago(usuarioId: number, pedidoId: number): Observable<PreferenciaPago> {
    return this.http.post<PreferenciaPago>(
      `${environment.API_URL}/pedidos/${pedidoId}/pagar?usuarioId=${usuarioId}`,
      {}
    );
  }

  confirmarPago(usuarioId: number, pedidoId: number): Observable<Pedido> {
    return this.http
      .put<PedidoBackend>(
        `${environment.API_URL}/pedidos/${pedidoId}/confirmar-pago?usuarioId=${usuarioId}`,
        {})
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  cancelarPedido(usuarioId: number, pedidoId: number): Observable<Pedido> {
    return this.http
      .put<PedidoBackend>(`${environment.API_URL}/pedidos/${pedidoId}/cancelar?usuarioId=${usuarioId}`, {})
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  agregarProducto(usuarioId: number, productoId: number, cantidad: number): Observable<Pedido> {
    return this.http
      .post<PedidoBackend>(`${environment.API_URL}/carrito/items?usuarioId=${usuarioId}`, { productoId, cantidad })
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  actualizarCantidadProducto(usuarioId: number, productoId: number, cantidad: number): Observable<Pedido> {
    return this.http
      .patch<PedidoBackend>(`${environment.API_URL}/carrito/items/${productoId}?usuarioId=${usuarioId}`, { cantidad })
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  quitarProducto(usuarioId: number, productoId: number): Observable<Pedido> {
    return this.http
      .delete<PedidoBackend>(`${environment.API_URL}/carrito/items/${productoId}?usuarioId=${usuarioId}`)
      .pipe(map((pedido) => this.mapearPedido(pedido)));
  }

  vaciarCarrito(usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL}/carrito?usuarioId=${usuarioId}`);
  }

  private mapearPedido(pedido: PedidoBackend): Pedido {
    return {
      id: pedido.id,
      usuario_id: pedido.usuario_id,
      fecha_creacion: pedido.fecha_creacion,
      fecha_actualizacion: pedido.fecha_actualizacion,
      estado: pedido.estado,
      precio_total: Number(pedido.precio_total),
      productos: (pedido.productos ?? []).map((item) => ({
        id: item.id,
        id_producto: item.producto_id,
        nombre: item.producto.nombre,
        descripcion: item.producto.descripcion,
        clasificacion: item.producto.clasificacion,
        precio: Number(item.precio_unitario),
        cantidad: item.cantidad,
        subtotal: Number(item.subtotal),
      })),
    };
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EstadoPedido, Pedido } from './../../modules/pedidos/interfaces/pedido.interface';
import { environment } from '../../../environments/environment.development';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  obtenerPedidoPendiente(usuarioId: number): Observable<Pedido> {
    // return this.http.get<Pedido>(`${environment.API_URL}/pedidos?usuarioId=${usuarioId}&estado=${EstadoPedido.PENDIENTE}`);
    // devuelve un pedido de ejemplo
    const pedidoEjemplo: Pedido = {
      id: 1,
      usuario_id: 1,
      fecha: "2023-06-01",
      estado: EstadoPedido.PENDIENTE,
      productos: [
        {
          id: 1,
          id_producto: 1,
          nombre: "Producto 1",
          descripcion: "Descripción del producto 1",
          clasificacion: "Categoría 1",
          precio: 10.0,
          cantidad: 2,
          subtotal: 20.0,
        },
        {
          id: 2,
          id_producto: 2,
          nombre: "Producto 2",
          descripcion: "Descripción del producto 2",
          clasificacion: "Categoría 2",
          precio: 15.0,
          cantidad: 1,
          subtotal: 15.0,
        },
        {
          id: 3,
          id_producto: 3,
          nombre: "Producto 3",
          descripcion: "Descripción del producto 3",
          clasificacion: "Categoría 3",
          precio: 20.0,
          cantidad: 1,
          subtotal: 20.0,
        }
      ],
      total: 55.0,
    };
    return of(pedidoEjemplo);
  }

  finalizarCompra(pedido: Pedido): Observable<void> {
    // return this.http.post<void>(`${environment.API_URL}/pedidos/finalizar`, pedido);
    console.log("Compra finalizada:", pedido);
    return of();
  }

  getPedidos() {
    // return this.http.get<Pedido[]>(`${environment.API_URL}/pedidos`);

    // devuelve un array de pedidos de ejemplo
    const pedidosEjemplo: Pedido[] = [
      {
        id: 1,
        usuario_id: 1,
        fecha: "2023-06-01",
        estado: EstadoPedido.PENDIENTE,
        productos: [
          {
            id: 1,
            id_producto: 1,
            nombre: "Producto 1",
            descripcion: "Descripción del producto 1",
            clasificacion: "Categoría 1",
            precio: 10.0,
            cantidad: 2,
            subtotal: 20.0,
          },
          {
            id: 2,
            id_producto: 2,
            nombre: "Producto 2",
            descripcion: "Descripción del producto 2",
            clasificacion: "Categoría 2",
            precio: 15.0,
            cantidad: 1,
            subtotal: 15.0,
          },
          {
            id: 3,
            id_producto: 3,
            nombre: "Producto 3",
            descripcion: "Descripción del producto 3",
            clasificacion: "Categoría 3",
            precio: 20.0,
            cantidad: 1,
            subtotal: 20.0,
          }
        ],
        total: 55.0,
      },
      {
        id: 2,
        usuario_id: 2,
        fecha: "2023-06-02",
        estado: EstadoPedido.EN_PROCESO,
        productos: [
          {
            id: 4,
            id_producto: 2,
            nombre: "Producto 2",
            descripcion: "Descripción del producto 2",
            clasificacion: "Categoría 2",
            precio: 15.0,
            cantidad: 1,
            subtotal: 15.0,
          }
        ],
        total: 15.0,
      },
      {
        id: 3,
        usuario_id: 3,
        fecha: "2023-06-03",
        estado: EstadoPedido.COMPLETADO,
        productos: [
          {
            id: 5,
            id_producto: 3,
            nombre: "Producto 3",
            descripcion: "Descripción del producto 3",
            clasificacion: "Categoría 3",
            precio: 20.0,
            cantidad: 1,
            subtotal: 20.0,
          },
          {
            id: 6,
            id_producto: 4,
            nombre: "Producto 4",
            descripcion: "Descripción del producto 4",
            clasificacion: "Categoría 4",
            precio: 25.0,
            cantidad: 1,
            subtotal: 25.0,
          }
        ],
        total: 45.0,
      }
    ];
    return pedidosEjemplo;
  }
}

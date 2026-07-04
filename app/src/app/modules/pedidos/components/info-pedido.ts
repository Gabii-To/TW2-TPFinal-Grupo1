import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EstadoPedido, Pedido, PedidoProducto } from '../interfaces/pedido.interface';

@Component({
  selector: 'app-info-pedido',
  standalone: true,
  templateUrl: './info-pedido.html',
  imports: [DatePipe, CurrencyPipe],
})
export class InfoPedido {
  pedido = input.required<Pedido>();
  mostrarAccionesCarrito = input(false);
  mostrarAccionesPedido = input(false);

  incrementarCantidad = output<PedidoProducto>();
  decrementarCantidad = output<PedidoProducto>();
  quitarProducto = output<PedidoProducto>();
  iniciarPago = output<Pedido>();
  cancelarPedido = output<Pedido>();

  EstadoPedido = EstadoPedido;

  imagenSrc(producto: PedidoProducto) {
    const imagen = producto.imagenPrincipal;
    return imagen ? `data:${imagen.tipo_mime};base64,${imagen.datos}` : '';
  }

  estadoClase() {
    switch (this.pedido().estado) {
      case EstadoPedido.PENDIENTE:
        return 'bg-yellow-100 text-yellow-700';
      case EstadoPedido.PAGO:
        return 'bg-green-100 text-green-700';
      case EstadoPedido.CANCELADO:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  }
}

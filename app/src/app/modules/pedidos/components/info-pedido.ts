import { Component, input, output } from "@angular/core";
import { EstadoPedido, Pedido, PedidoProducto } from "../interfaces/pedido.interface";
import { DatePipe } from "@angular/common";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-info-pedido",
  templateUrl: "./info-pedido.html",
  imports: [DatePipe, CurrencyPipe]
})

export class InfoPedido {
  pedido = input.required<Pedido>();
  mostrarAccionesCarrito = input(false);
  mostrarAccionesPedido = input(false);

  incrementarCantidad = output<PedidoProducto>();
  decrementarCantidad = output<PedidoProducto>();
  quitarProducto = output<PedidoProducto>();
  pagarPedido = output<Pedido>();
  cancelarPedido = output<Pedido>();

  EstadoPedido = EstadoPedido;

  imagenSrc(producto: PedidoProducto) {
    const imagen = producto.imagenPrincipal;
    return imagen ? `data:${imagen.tipo_mime};base64,${imagen.datos}` : '';
  }
}

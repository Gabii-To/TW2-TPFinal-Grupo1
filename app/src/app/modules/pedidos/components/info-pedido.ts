<<<<<<< Updated upstream
import { Component, input } from "@angular/core";
import { Pedido } from "../interfaces/pedido.interface";
import { DatePipe } from "@angular/common";
import { CurrencyPipe } from "@angular/common";
=======
import { Component, computed, input, output } from '@angular/core';
import { EstadoPedido, Pedido, PedidoProducto } from '../interfaces/pedido.interface';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
>>>>>>> Stashed changes

@Component({
  selector: 'app-info-pedido',
  templateUrl: './info-pedido.html',
  imports: [DatePipe, CurrencyPipe, Card, Tag, TableModule, Button],
})
export class InfoPedido {
  pedido = input.required<Pedido>();
<<<<<<< Updated upstream
=======
  mostrarAccionesCarrito = input(false);
  mostrarAccionesPedido = input(false);

  incrementarCantidad = output<PedidoProducto>();
  decrementarCantidad = output<PedidoProducto>();
  quitarProducto = output<PedidoProducto>();
  pagarPedido = output<Pedido>();
  cancelarPedido = output<Pedido>();

  EstadoPedido = EstadoPedido;

  estadoSeverity = computed(() => {
    switch (this.pedido().estado) {
      case EstadoPedido.PENDIENTE:
        return 'warn';
      case EstadoPedido.PAGO:
        return 'success';
      case EstadoPedido.CANCELADO:
        return 'danger';
      default:
        return 'info';
    }
  });
>>>>>>> Stashed changes
}

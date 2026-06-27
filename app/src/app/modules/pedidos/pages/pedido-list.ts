import { Component, signal } from "@angular/core";
import { Pedido } from "../interfaces/pedido.interface";
import { PedidoService } from "../../../services/pedidos/pedido-service";
import { InfoPedido } from "../components/info-pedido";

@Component({
  selector: "app-pedido-list",
  templateUrl: "./pedido-list.html",
  styleUrl: "./pedido-list.css",
  imports: [InfoPedido]
})
export class PedidoList {
  pedidos = signal<Pedido[]>([]);

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    const pedidosEjemplo = this.pedidoService.getPedidos();
    this.pedidos.set(pedidosEjemplo);
  }
}

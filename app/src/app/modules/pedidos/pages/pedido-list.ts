import { Component, signal } from "@angular/core";
import { Pedido } from "../interfaces/pedido.interface";
import { PedidoService } from "../../../services/pedidos/pedido-service";
import { InfoPedido } from "../components/info-pedido";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth/auth-service";

@Component({
  selector: "app-pedido-list",
  templateUrl: "./pedido-list.html",
  styleUrl: "./pedido-list.css",
  imports: [InfoPedido]
})
export class PedidoList {
  pedidos = signal<Pedido[]>([]);

  constructor(private pedidoService: PedidoService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    const pedidosEjemplo = this.pedidoService.getPedidos();
    this.pedidos.set(pedidosEjemplo);
  }
}

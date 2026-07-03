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
  cargando = signal(false);

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

    this.cargando.set(true);
    this.pedidoService.listarPedidos(usuario.id).subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos);
        this.cargando.set(false);
      },
      error: (err) => {
        this.cargando.set(false);
        console.error('Error al obtener pedidos:', err);
      }
    });
  }

  pagarPedido(pedido: Pedido) {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    localStorage.setItem('pedidoPago', pedido.id.toString());

    this.pedidoService.iniciarPago(usuario.id, pedido.id).subscribe({
      next: (respuesta) => {
        window.location.href = respuesta.init_point;
      },
      error: (err) => {
        console.log(err);
        console.log(err.error);
      }
    });
  }

  cancelarPedido(pedido: Pedido) {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService.cancelarPedido(usuario.id, pedido.id).subscribe({
      next: () => {
        this.obtenerPedidos();
      },
      error: (err) => {
        console.error('Error al cancelar pedido:', err);
      }
    });
  }
}

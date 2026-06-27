import { Component, signal } from "@angular/core";
import { Pedido } from "../interfaces/pedido.interface";
import { PedidoService } from "../../../services/pedidos/pedido-service";
import { AuthService } from "../../../services/auth/auth-service";
import { InfoPedido } from "../components/info-pedido";
import { Router } from "@angular/router";

@Component({
  selector: "app-carrito-detalle",
  templateUrl: "./carrito-detalle.html",
  styleUrl: "./carrito-detalle.css",
  imports: [InfoPedido]
})
export class CarritoDetalle {
  pedido = signal<Pedido>({} as Pedido);

  constructor(private pedidoService: PedidoService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.obtenerPedido();
  }

  obtenerPedido() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService.obtenerPedidoPendiente(usuario.id).subscribe({
      next: (res: Pedido) => {
        this.pedido.set(res);
      },
      error: () => {
        this.router.navigate(['/productos']);
      }
    });
  }

  finalizarCompra() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService.finalizarCompra(this.pedido()).subscribe({
      next: () => {
        console.log("Compra finalizada:", this.pedido());
        this.router.navigate(['/pedidos']);
      },
      error: () => {
        console.error("Error al finalizar la compra");
      }
    });
  }
}

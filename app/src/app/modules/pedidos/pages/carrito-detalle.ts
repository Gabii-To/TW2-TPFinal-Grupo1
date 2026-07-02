import { Component, signal } from "@angular/core";
import { Pedido, PedidoProducto } from "../interfaces/pedido.interface";
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
  pedido = signal<Pedido | null>(null);
  cargando = signal(false);

  constructor(private pedidoService: PedidoService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargando.set(true);
    this.pedidoService.obtenerCarrito(usuario.id).subscribe({
      next: (res: Pedido) => {
        this.pedido.set(res);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
        this.router.navigate(['/productos']);
      }
    });
  }

  incrementarCantidad(producto: PedidoProducto) {
    this.actualizarCantidad(producto, producto.cantidad + 1);
  }

  decrementarCantidad(producto: PedidoProducto) {
    if (producto.cantidad <= 1) {
      this.quitarProducto(producto);
      return;
    }

    this.actualizarCantidad(producto, producto.cantidad - 1);
  }

  actualizarCantidad(producto: PedidoProducto, cantidad: number) {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService.actualizarCantidadProducto(usuario.id, producto.id_producto, cantidad).subscribe({
      next: (res: Pedido) => {
        this.pedido.set(res);
      },
      error: (err) => {
        console.error('Error al actualizar cantidad:', err);
      }
    });
  }

  quitarProducto(producto: PedidoProducto) {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService.quitarProducto(usuario.id, producto.id_producto).subscribe({
      next: (res: Pedido) => {
        this.pedido.set(res);
      },
      error: (err) => {
        console.error('Error al quitar producto:', err);
      }
    });
  }

  vaciarCarrito() {
    const usuario = this.authService.usuarioLogueado();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.pedidoService.vaciarCarrito(usuario.id).subscribe({
      next: () => {
        this.obtenerCarrito();
      },
      error: (err) => {
        console.error('Error al vaciar el carrito:', err);
      }
    });
  }

  finalizarCompra() {
    const usuario = this.authService.usuarioLogueado();
    const pedido = this.pedido();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    if (!pedido || pedido.productos.length === 0) {
      return;
    }

    this.pedidoService.confirmarPedido(usuario.id).subscribe({
      next: () => {
        this.router.navigate(['/pedidos']);
      },
      error: () => {
        console.error("Error al finalizar la compra");
      }
    });
  }
}
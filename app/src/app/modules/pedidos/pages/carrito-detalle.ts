<<<<<<< Updated upstream
import { Component, signal } from "@angular/core";
import { Pedido } from "../interfaces/pedido.interface";
import { PedidoService } from "../../../services/pedidos/pedido-service";
import { AuthService } from "../../../services/auth/auth-service";
import { InfoPedido } from "../components/info-pedido";
import { Router } from "@angular/router";
=======
import { Component, signal } from '@angular/core';
import { Pedido, PedidoProducto } from '../interfaces/pedido.interface';
import { PedidoService } from '../../../services/pedidos/pedido-service';
import { AuthService } from '../../../services/auth/auth-service';
import { InfoPedido } from '../components/info-pedido';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
>>>>>>> Stashed changes

@Component({
  selector: 'app-carrito-detalle',
  templateUrl: './carrito-detalle.html',
  imports: [InfoPedido, Button, ProgressSpinner],
})
export class CarritoDetalle {
  pedido = signal<Pedido>({} as Pedido);

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router,
  ) {}

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
      },
    });
  }

<<<<<<< Updated upstream
=======
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
      },
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
      },
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
      },
    });
  }

>>>>>>> Stashed changes
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
        console.error('Error al finalizar la compra');
      },
    });
  }
}

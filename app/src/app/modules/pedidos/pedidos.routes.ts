import { Routes } from "@angular/router";
import { PedidoList } from "./pages/pedido-list";
import { CarritoDetalle } from "./pages/carrito-detalle";

export const pedidosRoutes: Routes = [
  {
    path: '',
    component: PedidoList
  }
];

export const carritoRoutes: Routes = [
  {
    path: '',
    component: CarritoDetalle
  }
];

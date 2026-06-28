import { Routes } from "@angular/router";
import { ProductoList } from "./pages/producto-list/producto-list";
import { ProductoCrear } from "./pages/producto-crear/producto-crear";
import { ProductoDetalle } from "./pages/producto-detalle/producto-detalle";

export const productosRoutes: Routes = [
  {
    path: '',
    component: ProductoList
  },
  {
    path: 'crear',
    component: ProductoCrear
  },
  {
    path: ':id',
    component: ProductoDetalle
  }
];



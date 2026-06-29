import { Routes } from "@angular/router";
import { ProductoList } from "./pages/producto-list/producto-list";
import { authGuard } from "../../guards/auth-guard";
import { ProductoDetalle } from "./pages/producto-detalle/producto-detalle";
import { ProductoCrear } from "./pages/producto-crear/producto-crear";

export const productosRoutes: Routes = [
  {
    path: '',
    component: ProductoList,
    canActivate: [authGuard]
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



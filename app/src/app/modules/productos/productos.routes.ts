import { Routes } from "@angular/router";
import { ProductoList } from "./pages/producto-list";
import { authGuard } from "../../guards/auth-guard";

export const productosRoutes: Routes = [
  {
    path: '',
    component: ProductoList,
    canActivate: [authGuard]
  }
];

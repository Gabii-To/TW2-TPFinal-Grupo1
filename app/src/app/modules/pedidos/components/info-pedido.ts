import { Component, input } from "@angular/core";
import { Pedido } from "../interfaces/pedido.interface";
import { DatePipe } from "@angular/common";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-info-pedido",
  templateUrl: "./info-pedido.html",
  imports: [DatePipe, CurrencyPipe]
})

export class InfoPedido {
  pedido = input.required<Pedido>();
}

import {Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { Producto } from '../interfaces/producto.interface';

@Component({
  standalone: true,
  selector: 'app-tabla-productos',
  imports: [CurrencyPipe],
  templateUrl: './tabla-productos.html',
  styleUrls: ['./tabla-productos.css'],
})

export class TablaProductos {
  productos = input.required<Producto[]>();
}

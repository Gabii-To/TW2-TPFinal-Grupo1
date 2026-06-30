import { Component, signal } from '@angular/core';
import { MenuComponent } from './public/menu/menu.component';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
}

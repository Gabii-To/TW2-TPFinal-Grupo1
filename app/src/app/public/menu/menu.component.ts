import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-menu',
  imports: [
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TitleCasePipe,
    Menu,
    Button,
    Divider,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  authService = inject(AuthService);
  router = inject(Router);

  menuItems = computed<MenuItem[]>(() => {
    const items: MenuItem[] = [
      {
        label: 'Productos',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/productos'],
      },
    ];

    if (this.authService.estaLogueado()) {
      items.push(
        {
          label: 'Carrito',
          icon: 'pi pi-shopping-cart',
          routerLink: ['/carrito'],
        },
        {
          label: 'Pedidos',
          icon: 'pi pi-list',
          routerLink: ['/pedidos'],
        },
      );
    } else {
      items.push(
        {
          label: 'Iniciar sesión',
          icon: 'pi pi-sign-in',
          routerLink: ['/login'],
        },
        {
          label: 'Registrarse',
          icon: 'pi pi-user-plus',
          routerLink: ['/auth/register'],
        },
      );
    }

    return items;
  });

  userMenuItems = computed<MenuItem[]>(() => [
    {
      label: 'Mi Perfil',
      icon: 'pi pi-user',
      routerLink: ['/usuario'],
    },
    {
      separator: true,
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.cerrarSesion(),
    },
  ]);

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleUserMenu(event: Event, menu: Menu) {
    menu.toggle(event);
  }
}

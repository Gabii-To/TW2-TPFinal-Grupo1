import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth/auth-service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [FooterComponent, RouterLink, RouterOutlet, TitleCasePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  authService = inject(AuthService);
  router = inject(Router);

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

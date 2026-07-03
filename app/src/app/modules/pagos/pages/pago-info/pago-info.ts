import { Component, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PedidoService} from '../../../../services/pedidos/pedido-service';
import {AuthService} from '../../../../services/auth/auth-service';

@Component({
  selector: 'app-pago-info',
  imports: [],
  templateUrl: './pago-info.html',
  styleUrl: './pago-info.css',
})
export class PagoInfo {
  private route = inject(ActivatedRoute);
  estado = '';

  constructor(
    private pedidoService: PedidoService,
    private auth: AuthService
  ) {}

  ngOnInit() {

    this.estado =
      this.route.snapshot.paramMap.get('estado') ||
      this.route.snapshot.queryParamMap.get('collection_status') ||
      '';

    if (this.estado !== 'success' && this.estado !== 'approved')
      return;

    const pedidoId = Number(localStorage.getItem('pedidoPago'));
    const usuario = this.auth.usuarioLogueado();

    if (usuario) {
      this.pedidoService.confirmarPago(usuario.id, pedidoId).subscribe({
        next: () => {
          localStorage.removeItem('pedidoPago');
        }
      });
    }
  }
}

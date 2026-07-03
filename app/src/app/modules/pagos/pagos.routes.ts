import {Routes} from '@angular/router';
import {PagoInfo} from './pages/pago-info/pago-info';

export const pagosRoutes: Routes = [
  {
    path: ':estado',
    component: PagoInfo
  }
];

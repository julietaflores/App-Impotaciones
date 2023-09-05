import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaBoletaTransportePage } from './lista-boleta-transporte.page';

const routes: Routes = [
  {
    path: '',
    component: ListaBoletaTransportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaBoletaTransportePageRoutingModule {}

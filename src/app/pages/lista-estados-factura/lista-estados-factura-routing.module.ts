import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEstadosFacturaPage } from './lista-estados-factura.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEstadosFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEstadosFacturaPageRoutingModule {}

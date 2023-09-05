import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDetalleLotesPage } from './lista-detalle-lotes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDetalleLotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDetalleLotesPageRoutingModule {}

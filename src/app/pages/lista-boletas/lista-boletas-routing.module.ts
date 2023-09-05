import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaBoletasPage } from './lista-boletas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaBoletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaBoletasPageRoutingModule {}

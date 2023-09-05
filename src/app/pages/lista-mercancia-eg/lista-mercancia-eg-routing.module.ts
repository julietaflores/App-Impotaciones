import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMercanciaEgPage } from './lista-mercancia-eg.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMercanciaEgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMercanciaEgPageRoutingModule {}



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMercanciaEg1Page } from './lista-mercancia-eg1.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMercanciaEg1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMercanciaEg1PageRoutingModule {}

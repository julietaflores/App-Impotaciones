import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreLotesPageListaPage } from './store-lotes-page-lista.page';

const routes: Routes = [
  {
    path: '',
    component: StoreLotesPageListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreLotesPageListaPageRoutingModule {}

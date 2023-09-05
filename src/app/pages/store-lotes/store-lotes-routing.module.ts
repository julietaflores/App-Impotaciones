import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreLotesPage } from './store-lotes.page';

const routes: Routes = [
  {
    path: '',
    component: StoreLotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreLotesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreDestinoPage } from './store-destino.page';

const routes: Routes = [
  {
    path: '',
    component: StoreDestinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDestinoPageRoutingModule {}

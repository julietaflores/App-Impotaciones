import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMaterialEstacionGuaracachiPage } from './lista-material-estacion-guaracachi.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMaterialEstacionGuaracachiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMaterialEstacionGuaracachiPageRoutingModule {}

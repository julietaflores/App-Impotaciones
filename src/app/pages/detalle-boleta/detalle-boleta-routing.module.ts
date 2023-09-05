import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleBoletaPage } from './detalle-boleta.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleBoletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleBoletaPageRoutingModule {}

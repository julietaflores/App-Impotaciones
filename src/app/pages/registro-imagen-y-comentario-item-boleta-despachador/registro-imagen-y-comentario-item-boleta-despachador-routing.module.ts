import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroImagenYComentarioItemBoletaDespachadorPage } from './registro-imagen-y-comentario-item-boleta-despachador.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroImagenYComentarioItemBoletaDespachadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroImagenYComentarioItemBoletaDespachadorPageRoutingModule {}

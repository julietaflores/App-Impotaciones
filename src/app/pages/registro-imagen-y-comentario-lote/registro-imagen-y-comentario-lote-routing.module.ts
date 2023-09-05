import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroImagenYComentarioLotePage } from './registro-imagen-y-comentario-lote.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroImagenYComentarioLotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroImagenYComentarioLotePageRoutingModule {}

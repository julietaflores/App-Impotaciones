import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroImagenYComentarioFNCPage } from './registro-imagen-y-comentario-fnc.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroImagenYComentarioFNCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroImagenYComentarioFNCPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroImagenYComentarioFncDosPage } from './registro-imagen-y-comentario-fnc-dos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroImagenYComentarioFncDosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroImagenYComentarioFncDosPageRoutingModule {}

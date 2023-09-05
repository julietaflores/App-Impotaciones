import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroImagenYComentarioItemPage } from './registro-imagen-y-comentario-item.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroImagenYComentarioItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroImagenYComentarioItemPageRoutingModule {}

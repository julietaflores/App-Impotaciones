import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroImagenYComentarioLotePageRoutingModule } from './registro-imagen-y-comentario-lote-routing.module';

import { RegistroImagenYComentarioLotePage } from './registro-imagen-y-comentario-lote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroImagenYComentarioLotePageRoutingModule
  ],
  declarations: [RegistroImagenYComentarioLotePage]
})
export class RegistroImagenYComentarioLotePageModule {}

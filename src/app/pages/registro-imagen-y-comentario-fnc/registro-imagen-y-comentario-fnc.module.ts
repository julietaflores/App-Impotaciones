import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroImagenYComentarioFNCPageRoutingModule } from './registro-imagen-y-comentario-fnc-routing.module';

import { RegistroImagenYComentarioFNCPage } from './registro-imagen-y-comentario-fnc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroImagenYComentarioFNCPageRoutingModule
  ],
  declarations: [RegistroImagenYComentarioFNCPage]
})
export class RegistroImagenYComentarioFNCPageModule {}

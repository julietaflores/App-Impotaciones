import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroImagenYComentarioFncDosPageRoutingModule } from './registro-imagen-y-comentario-fnc-dos-routing.module';

import { RegistroImagenYComentarioFncDosPage } from './registro-imagen-y-comentario-fnc-dos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroImagenYComentarioFncDosPageRoutingModule
  ],
  declarations: [RegistroImagenYComentarioFncDosPage]
})
export class RegistroImagenYComentarioFncDosPageModule {}

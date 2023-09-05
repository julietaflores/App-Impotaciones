import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroImagenYComentarioItemPageRoutingModule } from './registro-imagen-y-comentario-item-routing.module';

import { RegistroImagenYComentarioItemPage } from './registro-imagen-y-comentario-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroImagenYComentarioItemPageRoutingModule
  ],
  declarations: [RegistroImagenYComentarioItemPage]
})
export class RegistroImagenYComentarioItemPageModule {}

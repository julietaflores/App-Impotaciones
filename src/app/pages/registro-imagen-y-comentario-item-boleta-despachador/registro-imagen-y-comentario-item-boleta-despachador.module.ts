import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroImagenYComentarioItemBoletaDespachadorPageRoutingModule } from './registro-imagen-y-comentario-item-boleta-despachador-routing.module';

import { RegistroImagenYComentarioItemBoletaDespachadorPage } from './registro-imagen-y-comentario-item-boleta-despachador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroImagenYComentarioItemBoletaDespachadorPageRoutingModule
  ],
  declarations: [RegistroImagenYComentarioItemBoletaDespachadorPage]
})
export class RegistroImagenYComentarioItemBoletaDespachadorPageModule {}

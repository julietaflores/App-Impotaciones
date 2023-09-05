import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDetalleLotesPageRoutingModule } from './lista-detalle-lotes-routing.module';

import { ListaDetalleLotesPage } from './lista-detalle-lotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDetalleLotesPageRoutingModule
  ],
  declarations: [ListaDetalleLotesPage]
})
export class ListaDetalleLotesPageModule {}

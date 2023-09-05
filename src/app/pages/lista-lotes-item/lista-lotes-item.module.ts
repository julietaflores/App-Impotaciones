import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaLotesItemPageRoutingModule } from './lista-lotes-item-routing.module';

import { ListaLotesItemPage } from './lista-lotes-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaLotesItemPageRoutingModule
  ],
  declarations: [ListaLotesItemPage]
})
export class ListaLotesItemPageModule {}

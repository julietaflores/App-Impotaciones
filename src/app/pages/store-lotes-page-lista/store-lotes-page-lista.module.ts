import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreLotesPageListaPageRoutingModule } from './store-lotes-page-lista-routing.module';

import { StoreLotesPageListaPage } from './store-lotes-page-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreLotesPageListaPageRoutingModule
  ],
  declarations: [StoreLotesPageListaPage]
})
export class StoreLotesPageListaPageModule {}

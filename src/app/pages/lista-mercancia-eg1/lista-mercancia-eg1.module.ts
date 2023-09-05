import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMercanciaEg1PageRoutingModule } from './lista-mercancia-eg1-routing.module';

import { ListaMercanciaEg1Page } from './lista-mercancia-eg1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMercanciaEg1PageRoutingModule
  ],
  declarations: [ListaMercanciaEg1Page]
})
export class ListaMercanciaEg1PageModule {}

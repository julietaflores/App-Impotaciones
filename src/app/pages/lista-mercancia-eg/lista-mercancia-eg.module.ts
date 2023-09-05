import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMercanciaEgPageRoutingModule } from './lista-mercancia-eg-routing.module';

import { ListaMercanciaEgPage } from './lista-mercancia-eg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMercanciaEgPageRoutingModule
  ],
  declarations: [ListaMercanciaEgPage]
})
export class ListaMercanciaEgPageModule {}



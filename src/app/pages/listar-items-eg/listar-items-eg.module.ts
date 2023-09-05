import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarItemsEGPageRoutingModule } from './listar-items-eg-routing.module';

import { ListarItemsEGPage } from './listar-items-eg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarItemsEGPageRoutingModule
  ],
  declarations: [ListarItemsEGPage]
})
export class ListarItemsEGPageModule {}

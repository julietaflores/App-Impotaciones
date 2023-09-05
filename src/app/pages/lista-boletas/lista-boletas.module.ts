import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBoletasPageRoutingModule } from './lista-boletas-routing.module';

import { ListaBoletasPage } from './lista-boletas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBoletasPageRoutingModule
  ],
  declarations: [ListaBoletasPage]
})
export class ListaBoletasPageModule {}

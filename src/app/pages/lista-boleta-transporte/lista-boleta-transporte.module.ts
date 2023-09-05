import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBoletaTransportePageRoutingModule } from './lista-boleta-transporte-routing.module';

import { ListaBoletaTransportePage } from './lista-boleta-transporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBoletaTransportePageRoutingModule
  ],
  declarations: [ListaBoletaTransportePage]
})
export class ListaBoletaTransportePageModule {}

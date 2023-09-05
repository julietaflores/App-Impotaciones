import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEstadosFacturaPageRoutingModule } from './lista-estados-factura-routing.module';

import { ListaEstadosFacturaPage } from './lista-estados-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEstadosFacturaPageRoutingModule
  ],
  declarations: [ListaEstadosFacturaPage]
})
export class ListaEstadosFacturaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMaterialEstacionGuaracachiPageRoutingModule } from './lista-material-estacion-guaracachi-routing.module';

import { ListaMaterialEstacionGuaracachiPage } from './lista-material-estacion-guaracachi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMaterialEstacionGuaracachiPageRoutingModule
  ],
  declarations: [ListaMaterialEstacionGuaracachiPage]
})
export class ListaMaterialEstacionGuaracachiPageModule {}

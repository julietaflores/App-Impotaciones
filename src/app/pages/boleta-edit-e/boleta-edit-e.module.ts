import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaEditEPageRoutingModule } from './boleta-edit-e-routing.module';

import { BoletaEditEPage } from './boleta-edit-e.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaEditEPageRoutingModule
  ],
  declarations: [BoletaEditEPage]
})
export class BoletaEditEPageModule {}

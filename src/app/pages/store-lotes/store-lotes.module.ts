import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreLotesPageRoutingModule } from './store-lotes-routing.module';

import { StoreLotesPage } from './store-lotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreLotesPageRoutingModule
  ],
  declarations: [StoreLotesPage]
})
export class StoreLotesPageModule {}

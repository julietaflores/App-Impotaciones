import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreTicketbalanzaPageRoutingModule } from './store-ticketbalanza-routing.module';

import { StoreTicketbalanzaPage } from './store-ticketbalanza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreTicketbalanzaPageRoutingModule
  ],
  declarations: [StoreTicketbalanzaPage]
})
export class StoreTicketbalanzaPageModule {}

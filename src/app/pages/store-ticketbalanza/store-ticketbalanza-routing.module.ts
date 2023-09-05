import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreTicketbalanzaPage } from './store-ticketbalanza.page';

const routes: Routes = [
  {
    path: '',
    component: StoreTicketbalanzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreTicketbalanzaPageRoutingModule {}

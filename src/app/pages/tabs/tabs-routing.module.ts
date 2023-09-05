import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationGuard } from 'src/app/locationGuard/location.guard';
import { HomePageModule } from '../home/home.module';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/home',
      //   pathMatch: 'full'
      // },
      {
        path: 'home/:Id',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        pathMatch: 'full'
      },
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }

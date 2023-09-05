import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LocationGuard } from './locationGuard/location.guard';



const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then(m => m.LocationPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'choose-location',
    loadChildren: () => import('./pages/choose-location/choose-location.module').then(m => m.ChooseLocationPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'select-country',
    loadChildren: () => import('./pages/select-country/select-country.module').then( m => m.SelectCountryPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'redeem-success',
    loadChildren: () => import('./pages/redeem-success/redeem-success.module').then( m => m.RedeemSuccessPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./pages/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'stripe-pay',
    loadChildren: () => import('./pages/stripe-pay/stripe-pay.module').then( m => m.StripePayPageModule)
  },
  {
    path: 'add-stripe-card',
    loadChildren: () => import('./pages/add-stripe-card/add-stripe-card.module').then( m => m.AddStripeCardPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'history-details',
    loadChildren: () => import('./pages/history-details/history-details.module').then( m => m.HistoryDetailsPageModule)
  },
  {
    path: 'app-pages',
    loadChildren: () => import('./pages/app-pages/app-pages.module').then( m => m.AppPagesPageModule)
  },
  {
    path: 'languages',
    loadChildren: () => import('./pages/languages/languages.module').then( m => m.LanguagesPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./pages/referral/referral.module').then( m => m.ReferralPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./pages/complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'add-rating',
    loadChildren: () => import('./pages/add-rating/add-rating.module').then( m => m.AddRatingPageModule)
  },
  {
    path: 'verify-reset',
    loadChildren: () => import('./pages/verify-reset/verify-reset.module').then( m => m.VerifyResetPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'boleta',
    loadChildren: () => import('./pages/boleta/boleta.module').then( m => m.BoletaPageModule)
  },
  {
    path: 'boleta-edit-e',
    loadChildren: () => import('./pages/boleta-edit-e/boleta-edit-e.module').then( m => m.BoletaEditEPageModule)
  },
  {
    path: 'store-lotes',
    loadChildren: () => import('./pages/store-lotes/store-lotes.module').then( m => m.StoreLotesPageModule)
  },
  {
    path: 'lista-boletas',
    loadChildren: () => import('./pages/lista-boletas/lista-boletas.module').then( m => m.ListaBoletasPageModule)
  },
  {
    path: 'store-ticketbalanza',
    loadChildren: () => import('./pages/store-ticketbalanza/store-ticketbalanza.module').then( m => m.StoreTicketbalanzaPageModule)
  },
  {
    path: 'store-lotes-page-lista',
    loadChildren: () => import('./pages/store-lotes-page-lista/store-lotes-page-lista.module').then( m => m.StoreLotesPageListaPageModule)
  },
  {
    path: 'registro-imagen-y-comentario-fnc',
    loadChildren: () => import('./pages/registro-imagen-y-comentario-fnc/registro-imagen-y-comentario-fnc.module').then( m => m.RegistroImagenYComentarioFNCPageModule)
  },
  {
    path: 'lista-estados-factura',
    loadChildren: () => import('./pages/lista-estados-factura/lista-estados-factura.module').then( m => m.ListaEstadosFacturaPageModule)
  },
  {
    path: 'registro-imagen-y-comentario-fnc-dos',
    loadChildren: () => import('./pages/registro-imagen-y-comentario-fnc-dos/registro-imagen-y-comentario-fnc-dos.module').then( m => m.RegistroImagenYComentarioFncDosPageModule)
  },
  {
    path: 'listar-items-eg',
    loadChildren: () => import('./pages/listar-items-eg/listar-items-eg.module').then( m => m.ListarItemsEGPageModule)
  },
  {
    path: 'lista-material-estacion-guaracachi',
    loadChildren: () => import('./pages/lista-material-estacion-guaracachi/lista-material-estacion-guaracachi.module').then( m => m.ListaMaterialEstacionGuaracachiPageModule)
  },
  {
    path: 'lista-boleta-transporte',
    loadChildren: () => import('./pages/lista-boleta-transporte/lista-boleta-transporte.module').then( m => m.ListaBoletaTransportePageModule)
  },
  {
    path: 'registro-imagen-y-comentario-item',
    loadChildren: () => import('./pages/registro-imagen-y-comentario-item/registro-imagen-y-comentario-item.module').then( m => m.RegistroImagenYComentarioItemPageModule)
  },
  {
    path: 'lista-mercancia-eg',
    loadChildren: () => import('./pages/lista-mercancia-eg/lista-mercancia-eg.module').then( m => m.ListaMercanciaEgPageModule)
  },
  {
    path: 'detalle-boleta',
    loadChildren: () => import('./pages/detalle-boleta/detalle-boleta.module').then( m => m.DetalleBoletaPageModule)
  },
  {
    path: 'lista-mercancia-eg1',
    loadChildren: () => import('./pages/lista-mercancia-eg1/lista-mercancia-eg1.module').then( m => m.ListaMercanciaEg1PageModule)
  },
  {
    path: 'lista-lotes-item',
    loadChildren: () => import('./pages/lista-lotes-item/lista-lotes-item.module').then( m => m.ListaLotesItemPageModule)
  },
  {
    path: 'lista-detalle-lotes',
    loadChildren: () => import('./pages/lista-detalle-lotes/lista-detalle-lotes.module').then( m => m.ListaDetalleLotesPageModule)
  },
  {
    path: 'registro-imagen-y-comentario-lote',
    loadChildren: () => import('./pages/registro-imagen-y-comentario-lote/registro-imagen-y-comentario-lote.module').then( m => m.RegistroImagenYComentarioLotePageModule)
  },
  {
    path: 'registro-imagen-y-comentario-item-boleta-despachador',
    loadChildren: () => import('./pages/registro-imagen-y-comentario-item-boleta-despachador/registro-imagen-y-comentario-item-boleta-despachador.module').then( m => m.RegistroImagenYComentarioItemBoletaDespachadorPageModule)
  },
  {
    path: 'store-destino',
    loadChildren: () => import('./pages/store-destino/store-destino.module').then( m => m.StoreDestinoPageModule)
  },
  {
    path: 'boleta-edit-e',
    loadChildren: () => import('./pages/boleta-edit-e/boleta-edit-e.module').then( m => m.BoletaEditEPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

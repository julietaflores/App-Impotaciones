import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import {PDFGenerator} from '@awesome-cordova-plugins/pdf-generator/ngx';
import {PDFGenerator} from '@ionic-native/pdf-generator/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SearchPageModule } from './pages/search/search.module';
import { SelectCountryPageModule } from './pages/select-country/select-country.module';
import { VerifyPageModule } from './pages/verify/verify.module';
import { RedeemSuccessPageModule } from './pages/redeem-success/redeem-success.module';
import { OffersPageModule } from './pages/offers/offers.module';
import { AddAddressPageModule } from './pages/add-address/add-address.module';
import { StripePayPageModule } from './pages/stripe-pay/stripe-pay.module';
import { AddStripeCardPageModule } from './pages/add-stripe-card/add-stripe-card.module';
import { SuccessPageModule } from './pages/success/success.module';
import { AddRatingPageModule } from './pages/add-rating/add-rating.module';
import { VerifyResetPageModule } from './pages/verify-reset/verify-reset.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

// import { Console } from 'console';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx";



export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  imports: [ NgxIonicImageViewerModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,  
    HttpClientModule, 
    AppRoutingModule,
    SearchPageModule,
    SelectCountryPageModule,
    VerifyPageModule,
    RedeemSuccessPageModule,
    OffersPageModule,
    AddAddressPageModule,
    StripePayPageModule,
    AddStripeCardPageModule,
    SuccessPageModule,
    AddRatingPageModule,
    VerifyResetPageModule,


    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),],
  providers: [PDFGenerator,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser,BarcodeScanner],
  bootstrap: [AppComponent],
})
export class AppModule {}

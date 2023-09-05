import { Inject, Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NavigationExtras, Router } from '@angular/router';
import { AppSettings } from '../interfaces/settings';
import { SupportModel } from '../interfaces/support';
import { datos_inicio } from '../interfaces/datos_inicio';

import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
  
 
})
export class UtilService {
  isLoading = false;
  public lotes_auxiliar: any[] = [];
  public total_envio: any=0;
  public total_envio_variable: any='';
  public AB: any='';
  public lotes_auxiliar_v1: any[] = [];
  public lotes_auxiliar_codigo_barra: any[] = [];
  public lotes_auxiliar_v2: any[] = [];
  public lotes_auxiliar_v3: any[] = [];
  public lotes_auxiliar_v33: any[] = [];

  public dtos_lotes_v1: any[] = [];
  public dtos_lotes_v3: any[] = [];
  public validar_datos_despachador: any[] = [];

  public validar_total_item: any[] = [];
  public validar_itemm: any[] = [];


  public select_boleta_transporte: any[] = [];



  public arreglo: any[]  = [];

  public translations: any[] = [];
  public default_country_code: any = '';
  public user_verification: any = 0;
  public themeColor = [
    { name: 'Default', class: 'default' },
    { name: 'Dark', class: 'dark-theme' },
  ];

  public findType: any = 0;
  public userInfo: any;
  public general: any;
  public cside: any = 'left';
  public currecny: any = '$';
  public appName: any = '';
  public applabor: any = '';
  public appLogo: any = '';
  public direction: any = '';
  public show_booking: boolean = true;
  public app_color: any = '';
  public app_status: boolean = true;
  public app_closed_message: any = '';

  public cop1:any='';
  public cop2:any='';



  public offerAdded = new Subject<void>();
  public newAddress = new Subject<void>();
  public typeChanged = new Subject<void>();
  private orderChange = new Subject<void>();

 //  public haveFav: boolean;

  public settingInfo = {} as AppSettings;
  public supportData={} as SupportModel;
  public datos_inicioo={} as datos_inicio;



  public adminInfo: any;
  public diningInformations: any;
  public appClosedMessage: any = '';
 
  public loggedIN: boolean = false;
  public home_style: any = 1;
  public countrys: any[] = [];
  public smsGateway: any = '0';
  public login_style: any = 3;
  public user_login_with: any = 0;
  public register_style: any = 3;
  public servingCities: any[] = [];
  public cityName: any = '';
  public cityId: any = '';
  public zipcode: any = '';
  public deliveryAddress: any = '';
  public active_store: any[] = [];
  public favIds: any[] = [];

  public makeOrders: any = 0;
  public reset_pwd: any = 0;

  public allLanguages: any[] = [
    {
      name: 'Español',
      code: 'es',
      direction: 'ltr'
    },
    {
      name: 'English',
      code: 'en',
      direction: 'ltr'
    }
  ];
 


  public appPage_registrante: any[] = [];
  public appPage_lector: any[] = [];
  public appPage_despachador: any[] = [];


  constructor(
    public api: ApiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private zone: NgZone,
    private translateService: TranslateService,
    
 
    
  ) {



    this.appPage_registrante = [
      {
        title: 'Home',
        url: 'tabs/home/1',
        icn: 'home-outline'
      },
      // {
      //   title: 'Lista de Items en Estación Guaracachi',
      //   url: 'lista-material-estacion-guaracachi',
      //   icn: 'list-outline'
      // },
      {
        title: 'Registrar Boleta (Transporte)',
        url: 'boleta',
        icn: 'clipboard-outline'
      },
      {
        title: 'Lista Boleta (Transporte)',
        url: 'lista-boleta-transporte',
        icn: 'list-outline'
      },
      // {
      //   title: 'Language',
      //   url: 'languages',
      //   icn: 'language-outline'
      // }
    ];





    this.appPage_lector = [
      {
        title: 'Home',
        url: 'tabs/home/1',
        icn: 'home-outline'
      },
      {
        title: 'Language',
        url: 'languages',
        icn: 'language-outline'
      }
    ];



    this.appPage_despachador = [
      {
        title: 'Home',
        url: 'tabs/home/1',
        icn: 'home-outline'
      },
      {
        title: 'Lista Boleta (Transporte)',
        url: 'lista-boleta-transporte',
        icn: 'list-outline'
      },
      // {
      //   title: 'Language',
      //   url: 'languages',
      //   icn: 'language-outline'
      // }
    ];



  }


  publishNewAddress() {
    this.newAddress.next();
  }

  subscribeNewAddress(): Subject<void> {
    return this.newAddress;
  }





  orderChanged() {
    this.orderChange.next();
  }
  retriveChanges(): Subject<void> {
    return this.orderChange;
  }



  getKeys(key:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.getItem(key))
    });
  }

  clearKeys(key:any) {
    // this.storage.remove(key);
    localStorage.removeItem(key);
  }

  setKeys(key:any, value:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.setItem(key, value));
    });
  }



  onTypeChanged() {
    this.typeChanged.next();
  }

  getTypeChanged(): Subject<void> {
    return this.typeChanged;
  }

  translate(str:any) {
    return this.translateService.instant(str);
  }

  publishOffers() {
    this.offerAdded.next();
  }

  subscribeOffers(): Subject<void> {
    return this.offerAdded;
  };

  openMenu() {
    this.menuCtrl.open();
  }

  setFav(id:any) {
    this.favIds.push(id);
  }

  removeFav(id:any) {
    this.favIds = this.favIds.filter(x => x !== id);
  }



  async show11(msg?:any) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg && msg != '' && msg != null ? this.translate(msg) : '',
    
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async show(msg?:any) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg && msg != '' && msg != null ? this.translate(msg) : '',
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    this.isLoading = false;
   // return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }  
  
  
  async hidee() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  /*
    Show Warning Alert Message
    param : msg = message to display
    Call this method to show Warning Alert,
    */

  async showSimpleAlert(msg:any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: this.translate(msg),
      buttons: [this.translate('OK')]
    });

    await alert.present();
  }

  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
  async showErrorAlert(msg:any) {
    const alert = await this.alertCtrl.create({
      header: this.translate('Error'),
      message: msg,
      buttons: [this.translate('OK')]
    });

    await alert.present();
  }

  /*
     param : email = email to verify
     Call this method to get verify email
     */
  async getEmailFilter(email:any) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      const alert = await this.alertCtrl.create({
        header: this.translate('Warning'),
        message: this.translate('Please enter valid email'),
        buttons: [this.translate('OK')]
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }



  async showToast(msg:any, colors:any, positon:any) {
    const toast = await this.toastCtrl.create({
      message: this.translate(msg),
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }



  async shoNotification(msg:any, colors:any, positon:any) {

    const toast = await this.toastCtrl.create({
      message: this.translate(msg),
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: this.translate('OK'),
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }


  async showWarningAlert(msg:any) {
    const alert = await this.alertCtrl.create({
      header: this.translate('Warning'),
      message: this.translate(msg),
      buttons: [this.translate('OK')]
    });

    await alert.present();
  }


  async showSimpleAlert__(msg:any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: this.translate(msg),
      buttons: [    {
        text: this.translate('OK'),
        role: 'cancel',
        handler: () => {
          this.onBack();
        }
      }]
    });

    await alert.present();
  }







  async showSimpleAlert__boleta(msg:any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: this.translate(msg),
      buttons: [    {
        text: this.translate('OK'),
        role: 'cancel',
        handler: () => {
          this.select_boleta_transporte=[];
          const param: NavigationExtras = {
            queryParams: {
              "Id": 10
            }
          };
          this.navigateToPage('lista-boleta-transporte', param);
        }
      }]
    });
    await alert.present();
  }


  async shoNotification__(msg:any, colors:any, positon:any) {
    const toast = await this.toastCtrl.create({
      message: this.translate(msg),
      duration: 2000,
      color: colors,
      position: positon
    }).then((toast: HTMLIonToastElement) => {
      toast.onDidDismiss().then(() => {
        this.hidee();
        this.onBack();
      });
      toast.present();
    });
    await Haptics.impact({ style: ImpactStyle.Medium });
  }

  autoLoader() {
    this.toastCtrl.create({
      message: 'Loader hides after 4 seconds',
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }  


  async errorToast(msg:any, color?:any) {

    const toast = await this.toastCtrl.create({
      message: this.translate(msg),
      duration: 2000,
      color: color ? color : 'dark'
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }



  navigateToPage(routes:any, param?:any) {
    this.zone.run(() => {
      console.log(routes, param);
      this.router.navigate([routes], param);
    });
  }

  onBack() {
    this.navCtrl.back();
  }


  onBack_direccion(direccion:any) {
    this.navCtrl.navigateRoot('/'+direccion);
  }



  navigateRoot(routes:any) {
    this.zone.run(() => {
      this.navCtrl.navigateRoot([routes]);
    });
  }


  navigatePage(routes:any) {
    this.zone.run(() => {
      this.router.navigate([routes]);
    });
  }

  reloadPage() { // click handler or similar
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
  }



  apiErrorHandler(err:any) {
  
    if (err && err.status == 401 && err.error.error) {
      this.errorToast(err.error.error);
      this.navCtrl.navigateRoot('/login');
    }
    if (err && err.status == 500 && err.error.error) {
      this.errorToast(err.error.error);
    }
    if (err.status == -1) {
      this.errorToast('Failed To Connect With Server');
    } else if (err.status == 401) {
      this.errorToast('Unauthorized Request!');
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      this.navCtrl.navigateRoot('/login');
    } else if (err.status == 500) {
      this.errorToast('Something went wrong');
    } else if (err.status == 422 && err.error.error) {
      this.errorToast(err.error.error);
    } else {
     // this.errorToast('Something went wrong d');
    }

  }

  // setDetails(data) {
  //   this.details = null;
  //   this.details = data;
  // }
  // getDetails() {
  //   return this.details;
  // }

  makeid(length:any) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }






}

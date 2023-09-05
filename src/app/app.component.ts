import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { CartService } from './services/cart.service';
import { UtilService } from './services/util.service';
import { UtilRootService} from './services/util_root.service';
import { SoundEffect } from 'capacitor-sound-effect';
import { Capacitor } from '@capacitor/core';
import { datos_inicio } from 'src/app/interfaces/datos_inicio';
import * as moment from 'moment';



import {
  PushNotificationSchema,
  PushNotifications,
  ActionPerformed,
  Token
} from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { JsonPipe } from '@angular/common';
// import { Console } from 'console';
import { UtilRootParam } from './services/util_root.param';
import { datos_param } from './interfaces/datos_param';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  datos_inicio:   datos_inicio = { user_sap: '', uid_sap: '', pushToken:'', tipo_usuario:'', inicio_clik: 0 ,descripcion_tipo_persona:''};
  selectedIndex: any;
  vga: string|null = '';
  tipo_user: string|null = '';
  savedLotesId__: any[] = [];
  public appPages: any[] = []; 

  constructor(
    public urilroot: UtilRootService,
    public urilparam: UtilRootParam,
    public util: UtilService,
    public api: ApiService,
    public cart: CartService,
    private alertController: AlertController,
    private translate: TranslateService,
 
 
  ) {


    const defaultSettings = {
      id: 1,
      name: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      tax: 1,
      delivery_charge: 1,
      currencySymbol: '',
      currencySide: '',
      currencyCode: '',
      appDirection: '',
      logo: '',
      sms_name: '',
      have_shop: 1,
      findType: 1,
      reset_pwd: 1,
      user_login: 0,
      freelancer_login: 1,
      user_verify_with: 1,
      search_radius: 1,
      country_modal: '',
      default_country_code: '',
      default_city_id: '',
      default_delivery_zip: '',
      social: '',
      app_color: '',
      app_status: 1,
      status: 1,
      allowDistance: 1,
      searchResultKind: 1,
      extra_field: ''
    };


    const hapticsImpactMedium = async () => {
      await Haptics.impact({ style: ImpactStyle.Medium });
    };
    
    const hapticsImpactLight = async () => {
      await Haptics.impact({ style: ImpactStyle.Light });
    };
    
    const hapticsVibrate = async () => {
      await Haptics.vibrate({ duration: 3000 });
    };
    
    const hapticsSelectionStart = async () => {
      await Haptics.selectionStart();
    };
    
    const hapticsSelectionChanged = async () => {
      await Haptics.selectionChanged();
    };
    
    const hapticsSelectionEnd = async () => {
      await Haptics.selectionEnd();
    };


    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if(isPushNotificationsAvailable){
      this.initNotification();
    }

 
    this.util.settingInfo = defaultSettings;
    localStorage.setItem('selectedLanguage', 'es');

 

    this.translate.use(localStorage.getItem('selectedLanguage') || 'es');
    this.vga= localStorage.getItem('selectedLanguage');
    moment.locale("'"+this.vga+"'");



  }





  initNotification() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration',
      (token: any) => {
        console.log('MY push Token   fff', token.value);
        localStorage.setItem('pushToken', token.value);
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log(error);
    });

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        Haptics.vibrate({ duration: 500 });
      

        console.log('NOTIFICACION LLEGADA', notification);
        this.presentAlertConfirm(notification.title, notification.body);
      },
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: any) => {
        console.log('Notifcation actione', notification);
      },
    );

  
  }



   loadSounds() {
    SoundEffect.loadSound({id:'message', path:'assets/sounds/sonido.mp3'});
    SoundEffect.loadSound({id:'status', path:'assets/sounds/sonido.mp3'});
   }

  

  async presentAlertConfirm(title:any, body:any) {
    SoundEffect.play({id:'message'});
    const alert = await this.alertController.create({
      header: this.util.translate('Notification'),
      subHeader: title,
      message: body,
      buttons: [
        {
          text: this.util.translate('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.util.translate('Okay'),
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }



  haveSignedIn() {


    const datoss = {
      user_sap: (localStorage.getItem('user_sap')  || ''),
      uid_sap: (localStorage.getItem('uid_sap')|| ''),
      pushToken: localStorage.getItem('pushToken') && localStorage.getItem('pushToken') != null ? localStorage.getItem('pushToken') : 'NA',
      tipo_usuario: (localStorage.getItem('tipo_usuario')|| ''),
      inicio_clik: 0,
      descripcion_tipo_persona: (localStorage.getItem('descripcion_tipo_persona')  || ''),
    };


    const  dato_pa = {
      id_: (localStorage.getItem('id_')  || ''),
      cantidad_: (localStorage.getItem('cantidad_')|| '')
    };



      this.datos_inicio= datoss;
      this.urilroot.datos_inicioo= this.datos_inicio;
       
    this.util.appName=datoss.user_sap;
    this.util.applabor= datoss.descripcion_tipo_persona;
    const  uid_sap =datoss.uid_sap;

    if ( uid_sap != '' && uid_sap != undefined) {
       this.tipo_user=datoss.tipo_usuario;


       if(this.tipo_user=='2'){
        this.appPages = this.util.appPage_registrante;
        console.log('lista_menu '+JSON.stringify(this.appPages));
       }

       
       if(this.tipo_user=='1'){
        this.appPages = this.util.appPage_lector;
        console.log('lista_menu '+JSON.stringify(this.appPages));
       }

       if(this.tipo_user=='3'){
        this.appPages = this.util.appPage_despachador;
        console.log('lista_menu '+JSON.stringify(this.appPages));
       }


      return true;
    }else{
      return false;
    }

   }
 
 
   logout() {
     this.util.show(this.util.translate('Cerrando Sesion..'));
     this.selectedIndex=0;
     const datoss= this.urilroot.datos_inicioo;

      const datos_iniI = {
       user_sap: '',
       uid_sap: '',
       pushToken: '',
       tipo_usuario:'',
       inicio_clik:0,
       descripcion_tipo_persona:''
      };



      //Lotes 
      this.util.lotes_auxiliar_v3=[];
      this.util.lotes_auxiliar_v1=[];
      this.util.dtos_lotes_v3=[];
      this.util.dtos_lotes_v1=[];
      this.util.select_boleta_transporte=[];

      //lista de items


      this.util.lotes_auxiliar=[];
      this.util.validar_datos_despachador=[];

      localStorage.removeItem('user_sap');
      localStorage.removeItem('uid_sap');
      localStorage.removeItem('pushToken');
      localStorage.removeItem('tipo_usuario');


      localStorage.removeItem('tipo_usuario');

      
      localStorage.removeItem('descripcion_1');
      localStorage.removeItem('descripcion_2');
      localStorage.removeItem('descripcion_3');
      localStorage.removeItem('descripcion_4');
      localStorage.removeItem('descripcion_5');
      localStorage.removeItem('extension_item');
   

      localStorage.removeItem('id_lotesss');
      localStorage.removeItem('descripcion_tipo_persona');
      localStorage.removeItem('datos_lotes');
      localStorage.removeItem('validar_despachador');
      this.urilroot.datos_inicioo= datos_iniI;
      console.log('datos_INICIO Logout '+ JSON.stringify(this.urilroot.datos_inicioo));
      this.util.hidee();
      this.util.navigateRoot('/');
   }
 








  getTranslate(str:any) {
    return this.util.translate(str);
  }







}

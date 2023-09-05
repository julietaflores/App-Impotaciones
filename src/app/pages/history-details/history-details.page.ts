import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AddRatingPage } from '../add-rating/add-rating.page';
import { JsonPipe } from '@angular/common';
// import { truncateSync } from 'fs';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {
  id: any = '';
  id_articulo: any = '';
  apiCalled: boolean = false;
  storeName: any = '';
  storeAddress: any = '';
  storeCover: any = '';
  storeMobile: any = '';
  storeFCM: any = '';
  storeEmail: any = '';
  storeUID: any = '';
  isValidar: boolean = false;
  data_recepcion__l: any= 0;
  deliveryAddress: any = '';
  items: any[] = [];
  pickupDateTime: any = '';
  deliveryDateTime: any = '';

  totalPrice: any = 0;
  discount: any = 0;
  deliveryCost: any = 0;
  serviceTax: any = 0;
  grandTotal: any = 0;
  walletPrice: any = 0;
  notes: any = '';
  paid: any = '';
  status: any = 0;
  drt:Boolean=false;

  canCancle?: boolean;
  isDelivered?: boolean;
  oldOrders: any[] = [];
  driverName: any = '';
  driverId: any = '';
  driverCover: any = '';
  driverEmail: any = '';
  driverMobile: any = '';
  driverLat: any = '';
  driverLng: any = '';
  haveDriver: boolean = false;
  constructor(
    public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private iab: InAppBrowser,
    private modalController: ModalController
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log('buscar ' + data);
      console.log('buscar1 ' + JSON.stringify(data));
      if (data && data.id) {
        this.id = data.id;
        this.util.show(this.util.translate('Cargando Información..'));
        this.getOrderDetails();
      }
    });
  }




  validar_BOTON_FOOTER() {

    this.api.get_JSON('Validar_recepcion_mercancia', this.oldOrders).then((data_recepcion__: any) => {
      console.log('estado_registro boton_footer '+data_recepcion__);
      if(data_recepcion__=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        if(data_recepcion__==0){
          this.isValidar= true;
          this.data_recepcion__l= data_recepcion__;
        }else{
         this.isValidar= false;
         this.data_recepcion__l=1;
        }
      }
      

    }, error => {
        this.util.apiErrorHandler(error);
    }).catch(error => {
        this.util.apiErrorHandler(error);
    });
  }

  





  
  getOrderDetails() {



    this.apiCalled = false;
    this.api.get_public_parametro('factura_nacionalizada_x_docentryy', { "id": this.id }).then((data_: any) => {
      console.log(JSON.stringify(data_));

      if(data_=='error'){
        this.util.hidee();
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{


        this.oldOrders = [];
        this.apiCalled = true;
        data_.forEach((element_: any) => {
          console.log(element_.DocNum);
          this.storeName = element_.DocNum;
          this.storeAddress = element_.U_IM_NumeroDUI;
          element_.Quantity = (element_.Quantity);
          element_.Quantity_aux =  (element_.Quantity);
  
  
          element_.Cantidad = (element_.Cantidad);
          element_.Cantidad_aux = (element_.Cantidad);
          element_.user= localStorage.getItem('user_sap'); 
  
  
  
          this.drt = element_.Quantity_aux.includes(',');
          console.log('validar '+this.drt);
  
          var num:Boolean = this.drt;
          while(num == true) { 
             const posi = element_.Quantity_aux.search(',');
             console.log('posi '+posi);
             const newStr0 = element_.Quantity_aux.substring(0,posi);
             const newStr1 = element_.Quantity_aux.substring(posi+1,element_.Quantity_aux.length);
             const newStr2= newStr0+newStr1;
             element_.Quantity_aux = newStr2;
             console.log('actualizado '+element_.Quantity_aux);
             this.drt = element_.Quantity_aux.includes(',');
             num=this.drt;
          } 
  
  
  
  
          this.oldOrders.push(element_);
          console.log('lista de_ordern ' + JSON.stringify(this.oldOrders));
  
          this.validar_BOTON_FOOTER();
  
          this.util.hidee();
  
        });

      }


   

    }, error => {
      console.log(error);
      this.apiCalled = true;
      this.util.apiErrorHandler(error);
    }).catch((error: any) => {
      console.log(error);
      this.apiCalled = true;
      this.util.apiErrorHandler(error);
    });



  }


















  


  async registrar_datos_articulo(id_articulo: any) {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Registrar Detalle del Artículo'),
        role: 'destructive',
        icon: 'create-outline',
        handler: () => {
          const param: NavigationExtras = {
            queryParams: {
              "id": this.id,
              "id_articulo": id_articulo,
            }
          };
          this.util.navigateToPage('complaints', param);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }


  async ver_datos_articulo(id_articulo: any) {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Ver Detalle del Artículo'),
        role: 'destructive',
        icon: 'search-outline',
        handler: () => {
          const param: NavigationExtras = {
            queryParams: {
              "id": this.id,
              "id_articulo": id_articulo,
            }
          };
          this.util.navigateToPage('complaints', param);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }



  ngOnInit() {
  }


  async presentAlertConfirm() {
    let buttons: any[] = [];
    buttons.push({
      text: this.util.translate('Give Review to Store'),
      icon: 'star-outline',
      handler: () => {
        console.log('Store clicked');
        this.reviewModal("store", this.storeUID, this.storeName, 'NA');
      }
    });
    buttons.push({
      text: this.util.translate('Give Review to Services'),
      icon: 'star-outline',
      handler: () => {
        console.log('Service clicked');
        this.reviewModal("service", 0, 'Service', this.items);
      }
    });
    if (this.haveDriver == true) {
      buttons.push({
        text: this.util.translate('Give Review to Driver'),
        icon: 'star-outline',
        handler: () => {
          console.log('Driver clicked');
          this.reviewModal("driver", this.driverId, this.driverName, 'Na');
        }
      });
    }
    buttons.push({
      text: this.util.translate('Cancel'),
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Give Review'),
      buttons: buttons
    });

    await actionSheet.present();
  }




  async reviewModal(to: any, id: any, name: any, items: any) {
    const modal = await this.modalController.create({
      component: AddRatingPage,
      componentProps: {
        "to": to,
        "id": id,
        "name": name,
        "items": items
      }
    });

    await modal.present();

  }











  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Make Phone Call'),
        icon: 'call-outline',
        handler: () => {
          console.log('Call clicked');
          window.open('tel:' + this.storeMobile, '_blank');
        }
      }, {
        text: this.util.translate('Send Email'),
        icon: 'mail-unread-outline',
        handler: () => {
          console.log('Email clicked');
          window.open('mailto:' + this.storeEmail, '_blank');
        }
      }, {
        text: this.util.translate('Send Chat Message'),
        icon: 'chatbubble-ellipses-outline',
        handler: () => {
          console.log('Chat clicked');
          const param: NavigationExtras = {
            queryParams: {
              "id": this.storeUID,
              "name": this.storeName
            }
          };
          this.util.navigateToPage('inbox', param);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentDriverActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Make Phone Call'),
        icon: 'call-outline',
        handler: () => {
          console.log('Call clicked');
          window.open('tel:' + this.driverMobile, '_blank');
        }
      }, {
        text: this.util.translate('Send Email'),
        icon: 'mail-unread-outline',
        handler: () => {
          console.log('Email clicked');
          window.open('mailto:' + this.driverEmail, '_blank');
        }
      }, {
        text: this.util.translate('Send Chat Message'),
        icon: 'chatbubble-ellipses-outline',
        handler: () => {
          console.log('Chat clicked');
          const param: NavigationExtras = {
            queryParams: {
              "id": this.driverId,
              "name": this.driverName
            }
          };
          this.util.navigateToPage('inbox', param);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }







  async presentAlert_todos_los_datos_fueron_guardados() {
    const alert = await this.alertController.create({
      header: this.util.translate('Registro Detalle en SAP'),
      message: this.util.translate('Todos los datos fueron guardados, actualize la información nuevamente'),
      buttons: [
        {
          text: this.util.translate('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: this.util.translate('Okay'),
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }



  async presentAlert_guardar_info() {
    const alert = await this.alertController.create({
      header: this.util.translate('Registro Detalle en SAP'),
      message: this.util.translate('Esta seguro de registrar los nuevos detalles en SAP?'),
      buttons: [
        {
          text: this.util.translate('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
            this.isValidar = false;
          }
        },
        {
          text: this.util.translate('Okay'),
          handler: () => {
            console.log('Confirm Okay');
            console.log('lista de_ordern  ' + JSON.stringify(this.oldOrders));
            const lista_orden = [...new Set(this.oldOrders.map(item => item.Cantidad))];
            console.log('LISTA DE ORDEN ' + JSON.stringify(lista_orden));
            console.log(lista_orden.join(','));



            this.util.show(this.util.translate('Registrando Información..'));
             
            this.api.insert_JSON('registrar_recepcion_mercancia', this.oldOrders).then((data_recepcion: any) => {

               if(data_recepcion=='error'){
                this.util.errorToast(this.util.translate('No internet connection'), 'danger');
               }else{
                console.log('LISTA DE ORDEN RESULTADO '+data_recepcion);
                if(data_recepcion>0){
                  if(data_recepcion==100){
                  }else{
                    this.isValidar = false;
                    this.util.hidee();
                    this.getOrderDetails();
                  }
                }
               }
         
            }, error => {
                console.log(error);
                this.util.hidee();
                this.util.apiErrorHandler(error);
            }).catch(error => {
                console.log(error);
                this.util.hidee();
                this.util.apiErrorHandler(error);
            });







          }
        }
      ]
    });
    await alert.present();
  }







  guardar_todo() {
    this.isValidar = true;
    this.presentAlert_guardar_info();
  }







  onBack() {
    this.util.onBack();
  }




  async openHelp() {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Complaints'),
        role: 'destructive',
        icon: 'at-outline',
        handler: () => {
          console.log('Complaints clicked');
          const param: NavigationExtras = {
            queryParams: {
              "id": this.id,
            }
          };
          this.util.navigateToPage('complaints', param);
        }
      }, {
        text: this.util.translate('Support Chat'),
        icon: 'chatbubble-ellipses-outline',
        handler: () => {
          console.log('Share clicked');
          console.log(this.util.supportData.id);
          const param: NavigationExtras = {
            queryParams: {
              "id": this.util.supportData.id,
              "name": "Support"
            }
          };
          this.util.navigateToPage('inbox', param);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }








  async invoice() {
    const options: InAppBrowserOptions = {
      location: 'no',
      clearcache: 'yes',
      zoom: 'yes',
      toolbar: 'yes',
      closebuttoncaption: 'close'
    };
    const param = {
      "id": this.id,
      "token": localStorage.getItem('token')
    }
    await this.iab.create(this.api.baseUrl + 'v1/orders/getOrderInvoice?' + this.api.JSON_to_URLEncoded(param), '_blank', options);
  }
}

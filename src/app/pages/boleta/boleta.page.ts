import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController , AlertController } from '@ionic/angular';
import { StoreLotesPage } from '../store-lotes/store-lotes.page';
import { StoreLotesPageListaPage } from '../store-lotes-page-lista/store-lotes-page-lista.page';
import { StoreTicketbalanzaPage } from '../store-ticketbalanza/store-ticketbalanza.page';
import * as moment from 'moment';
import { JsonPipe } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import { StoreDestinoPage } from '../store-destino/store-destino.page';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
})
export class BoletaPage implements OnInit {
  datos_paramm:any='';
  apiCalled: boolean = false;
  firstName: any = '';
  comentario: any='';
  lastName: any = '';
  name: any = '';
  cover: any = '';
  address: any = '';
  about: any = '';
  categories: any[] = [];
  almacen: any[] = [];
  lotes: any[] = [];
  lista_ticket_balanza: any[] = [];
  lista_ticket_destino: any[] = [];
  lat: any = '';
  lng: any = '';
  zipcode: any = '';
  gender: any = '';
  email: any = '';
  storeId: any = '';
  isLogin: boolean = false;

  nombre_almacen_recepcion: any='';
  id_almacen_recepcion: any='';
  fecha_registro: any='';
  AB:any='';



  constructor(  
    public util: UtilService,
    public api: ApiService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController

    ) 
    { 

      this.api.get_public('ListaAlmacen').then((data_l: any) => {
        data_l.forEach((element_:any) => {
          this.nombre_almacen_recepcion= element_.WhsName;
          this.id_almacen_recepcion= element_.WhsCode;
        });
      });



      console.log('json cambio localstore 1 items '+JSON.stringify(localStorage.getItem("id_lotesss")));
      this.util.lotes_auxiliar_v3 = JSON.parse(localStorage.getItem("id_lotesss") || "[]");
      this.util.lotes_auxiliar_v3 = this.util.lotes_auxiliar_v3.sort((a, b) => (a.campo1 > b.campo1) ? -1 : 1);
      console.log('json cambio localstore 1 items order'+JSON.stringify(this.util.lotes_auxiliar_v3));
      this.util.total_envio=0;
      if(this.util.lotes_auxiliar_v3.length>0){
        this.util.lotes_auxiliar_v3.forEach(oo => {
          this.util.total_envio=this.util.total_envio+parseFloat(oo.peso_actual);
        });
        this.util.total_envio = this.util.total_envio.toLocaleString('es-MX'); // 12,000
        this.util.total_envio_variable =  this.util.total_envio.replace(/,/g, '');
     }
      this.AB=localStorage.getItem('descripcion_2');
   
    }

  
    ngOnInit() {
      moment.locale(localStorage.getItem('selectedLanguage') || 'es');
      this.fecha_registro=moment().format('LLLL');
      console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
      
    }


  
    onSave() {
      if (this.util.lotes_auxiliar_v3.length>0 && this.lista_ticket_balanza.length>0 && this.lista_ticket_destino.length>0 ) {
        this.presentAlert();
      }else{
        this.util.errorToast('All fields are required');
      }
    }


    async presentAlert() {
      const alert = await this.alertController.create({
        header: this.util.translate('Registro de Boleta de Transporte'),
        message: this.util.translate('Esta seguro de guardar la Información?'),
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
              this.callApi();
            }
          }
        ]
      });
      await alert.present();
    }




    callApi(){
      this.util.lotes_auxiliar_v1 =JSON.parse(localStorage.getItem("datos_lotes") || "[]");
      console.log('json cambio '+JSON.stringify(this.util.lotes_auxiliar_v1));
      this.util.show(this.util.translate('Registrando Boleta...'));
      this.util.lotes_auxiliar_v3.forEach(oo => {
        oo.campo6= oo.campo6.replace(/#/g, '');
      });
      console.log('json cambio 99 '+JSON.stringify(this.util.lotes_auxiliar_v3));
      const param = {
        mercaderia: this.util.lotes_auxiliar_v3,
        ticket_balanza: this.lista_ticket_balanza ,
        comentario: this.comentario,
        ubicacion: this.id_almacen_recepcion,
        lista_lotes: this.util.lotes_auxiliar_v1,
        user: localStorage.getItem('user_sap'),
        total: this.util.total_envio_variable,
        lista_codigo_barra: this.util.lotes_auxiliar_codigo_barra,
        ticket_destino: this.lista_ticket_destino
      };
      console.log('json cambio  datos boleta '+JSON.stringify(param));
      this.api.insert_datos_json('registrar_boleta', param).then((data_r: any) => {
        if (data_r!='error') {
          if(data_r>0){
            this.util.lotes_auxiliar_v1=[];  
            this.util.lotes_auxiliar_v3=[];
            this.util.lotes_auxiliar_codigo_barra=[];
            
            localStorage.removeItem('id_lotesss');
            localStorage.removeItem('datos_lotes');
            localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
            this.lista_ticket_balanza =[];
            this.comentario=[];
            this.id_almacen_recepcion=0;
            localStorage.setItem("datos_lotes", JSON.stringify( this.util.lotes_auxiliar_v1));
            this.util.total_envio_variable='0';
            this.util.total_envio='0';
            this.util.showSimpleAlert__boleta('Proceso registrado correctamente');

          }else{
            this.util.errorToast(this.util.translate('Error de Registro'), 'danger');
          }
        }else{
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
        }
        this.util.hidee();
      });
    }






  
    onBack() {
      this.util.navigateRoot('tabs/home/1');
    }
  




    async openTicketBalanza() {
      const modal = await this.modalController.create({
        component: StoreTicketbalanzaPage,
        componentProps: { lista_ticket_balanza: this.lista_ticket_balanza }
      });
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          this.lista_ticket_balanza = data.data;
        }
      });
      await modal.present();
    }
    


    async openDestino() {
      const modal = await this.modalController.create({
        component: StoreDestinoPage,
        componentProps: { lista_ticket_destino: this.lista_ticket_destino }
      });
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          this.lista_ticket_destino = data.data;
        }
      });
      await modal.present();
    }



    
 
    async openlote() {
      const paramm: NavigationExtras = {
        queryParams: {  "id_lote_ubi": 0}
      };
       this.util.navigateToPage('lista-mercancia-eg1', paramm);
    }





}

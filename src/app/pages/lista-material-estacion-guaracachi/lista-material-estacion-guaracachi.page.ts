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
  selector: 'app-lista-material-estacion-guaracachi',
  templateUrl: './lista-material-estacion-guaracachi.page.html',
  styleUrls: ['./lista-material-estacion-guaracachi.page.scss'],
})
export class ListaMaterialEstacionGuaracachiPage implements OnInit {

  contadorr:any=0;
  detalle_detalle:any='';
  limit: any=1;
  extension: any=15;
  le_aux:any=0;
  id: any = '';
  Estado:any='';
  apiCalled: boolean = false;
  oldOrders: any[] = [];
  dummyCate: any[] = [];
  docmun: any= '';
  numero_de_dui: any='';

  cantidad_original: any= '';
  cantidad_original_num: any= 0;
  cantidad_pendiente: any= '';
  cantidad_pendiente_num: any= 0;


  constructor(
    public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private iab: InAppBrowser,
    private modalController: ModalController
    ) {
          this.getOrderDetails('',false);
      }

  ngOnInit() {
  }


    
  doRefresh(event:any) {
    console.log(event);
    this.limit = this.limit + 1;

    console.log('dato_lmeg '+JSON.stringify(event));
    console.log('dato_lmeg '+this.limit);
    this.getOrderDetails(event, true);
  }

  onBack() {
    this.util.navigateRoot('tabs/home/1');
  }



  
  onSearchChange(event:any) {
    console.log(event.detail.value);
    this.oldOrders = this.dummyCate.filter((ele: any) => {
      return ele.Descripcion.toLowerCase().includes(event.detail.value.toLowerCase());
    });
  }



  
  getOrderDetails(event:any,haveRefresh:any) {
    this.apiCalled = false;
    this.le_aux= this.limit*this.extension;
    console.log('dato_lmeg '+this.le_aux);
    this.api.get_public_parametro('listar_estacion_guaracachi_docentry_total_total_lista_estacion_guaracachi', { "limit":  this.le_aux }).then((data_: any) => {
      console.log('dato_lmeg '+JSON.stringify(data_));

      if(data_=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        this.contadorr=0;
        this.oldOrders = [];
        this.apiCalled = true;
        this.dummyCate= [];
       
        data_.forEach((element_: any) => {
      
          this.contadorr=this.contadorr+1;
          this.cantidad_original= element_.Cantidad;
          this.cantidad_original_num= parseFloat(this.cantidad_original);
          element_.Cantidad= this.cantidad_original_num;
          element_.Cantidad =  element_.Cantidad.toLocaleString('es-MX'); // 12,000
          this.cantidad_pendiente= element_.CantidadPendiente;
          this.cantidad_pendiente_num= parseFloat(this.cantidad_pendiente);
          element_.CantidadPendiente= this.cantidad_pendiente_num;
          element_.CantidadPendiente =  element_.CantidadPendiente.toLocaleString('es-MX'); // 12,000
          this.oldOrders.push(element_);
          this.dummyCate.push(element_);
          console.log('lista_eg_ ' + JSON.stringify(this.oldOrders));
          
        });

        console.log('datos bu '+this.contadorr);
        console.log('datos bu '+this.le_aux);
        console.log('datos bu '+haveRefresh);
        
        event.target.complete();

        if (this.contadorr<this.le_aux ) {
          event.target.disabled = true;
        }


      }
    });
  }











  async registrar_fotos_y_comentarios(IdItem: any, posi:any, vista:any) {

    if(posi==1){
        this.detalle_detalle="Registrar Fotos del Item";
    }else{
        this.detalle_detalle="Listar Fotos del Item";
    }

    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{

  

        text: this.util.translate(this.detalle_detalle),
        role: 'destructive',
        icon: 'image-outline',
        handler: () => {
          const param: NavigationExtras = {
            queryParams: {
              "Id": IdItem,
              "posi":posi,
              "vista":vista
            }
          };
          this.util.navigateToPage('registro-imagen-y-comentario-item', param);
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












}

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
  selector: 'app-listar-items-eg',
  templateUrl: './listar-items-eg.page.html',
  styleUrls: ['./listar-items-eg.page.scss'],
})
export class ListarItemsEGPage implements OnInit {
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
  constructor( public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private iab: InAppBrowser,
    private modalController: ModalController) {  
      
      this.route.queryParams.subscribe((data: any) => {
      console.log('buscar ' + data);
      console.log('buscar1 ' + JSON.stringify(data));
      if (data && data.id  && data.Estado) {
        this.id = data.id;
        this.Estado= data.Estado;

        this.getOrderDetails();
      }
    });
  
  }

  ngOnInit() {
  }

  onBack() {
    this.util.navigateRoot('tabs/home/'+this.Estado);
  }





  onSearchChange(event:any) {
    console.log(event.detail.value);
    this.oldOrders = this.dummyCate.filter((ele: any) => {
      return ele.Descripcion.toLowerCase().includes(event.detail.value.toLowerCase());
    });
  }





  getOrderDetails() {
    this.apiCalled = false;
    this.util.show(this.util.translate('Cargando Información..'));
    this.api.get_public_parametro('listar_estacion_guaracachi_docentry', { "id": this.id }).then((data_: any) => {
      console.log('lista_eg_ '+JSON.stringify(data_));

      if(data_=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        this.oldOrders = [];
        this.apiCalled = true;
        data_.forEach((element_: any) => {
          this.docmun= element_.DocNum;
          this.numero_de_dui= element_.U_IM_NumeroDUI;


          this.cantidad_original= element_.Cantidad;
          this.cantidad_original_num= parseFloat(this.cantidad_original);
          element_.Cantidad= this.cantidad_original_num;

          this.cantidad_pendiente= element_.CantidadPendiente;
          this.cantidad_pendiente_num= parseFloat(this.cantidad_pendiente);
          element_.CantidadPendiente= this.cantidad_pendiente_num;

          this.oldOrders.push(element_);
          this.dummyCate.push(element_);
          console.log('lista_eg_ ' + JSON.stringify(this.oldOrders));



        });
      }
    });
    this.util.hidee();
  }


  

}

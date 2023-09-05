import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ActionSheetController, AlertController, IonInput, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';
import { AddRatingPage } from '../add-rating/add-rating.page';
import { JsonPipe } from '@angular/common';
import { UtilRootService } from 'src/app/services/util_root.service';


@Component({
  selector: 'app-lista-boleta-transporte',
  templateUrl: './lista-boleta-transporte.page.html',
  styleUrls: ['./lista-boleta-transporte.page.scss'],
})
export class ListaBoletaTransportePage implements OnInit {
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;


  ticket_balanza:any=0;
  contadorr:any=0;
  canti1:any=0;
  canti2:any=0;
  canti3:any=0;
  canti4:any=0;
  canti5:any=0;
  stores_lio: any[] = [];
  stores_lio_detalle: any[] = [];
  stores_lio_firma: any[] = [];


  tipo_personaa:any='';
  le_aux:any=0;
  id: any = '';
  Estado:any='';
  apiCalled: boolean = false;
  docmun: any= '';
  numero_de_dui: any='';
  id_posi:any='';
  cantidad_original: any= '';
  cantidad_original_num: any= 0;
  cantidad_pendiente: any= '';
  cantidad_pendiente_num: any= 0;
  html:any='';

  oldOrders: any[] = [];
  dummyCate: any[] = [];
  dummy: any[] = [];



 htmll1='';
 htmll2='';
 htmll3='';
 htmll4='';
 htmll_lote='';
 htmp1:any='';
 htmp2:any='';
 htmp3:any='';
 peso_unidad:any='';
 peso_peso:any='';
 codigo_boletaa:any='';



  constructor( 
    public urilroot: UtilRootService,
    private pdfGenerator: PDFGenerator,
    public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private iab: InAppBrowser,
    private modalController: ModalController) {  
  
    const before = Date.now();


      this.tipo_personaa= this.urilroot.datos_inicioo.tipo_usuario;


      this.route.queryParams.subscribe((data: any) => {
        if (data && data.Id ) {
          console.log('datos info '+JSON.stringify(data));
          this.id_posi= data.Id;
          this.dummy = Array(10);
          this.getOrderDetails();
        }else{
          this.id_posi= 0;
          this.dummy = Array(10);
          this.getOrderDetails();
        }
       });
     
    }




  ngOnInit() {
  }






  onBack() {
    this.util.navigateRoot('tabs/home/1');
  }


  onInpu(ev:any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9-]+/g, '');
    console.log('json  existe 0 0 0 0 '+filteredValue);
    console.log('json  existe 0 0 0 0 '+filteredValue.toUpperCase());
    this.ionInputEl.value=filteredValue.toUpperCase()||'';
 
  }
  
  
  onSearchChange(event:any) {
    console.log(event.detail.value);
    this.oldOrders = this.dummyCate.filter((ele: any) => {
      return ele.Codigo.toLowerCase().includes(event.detail.value.toLowerCase());
    });
  }



  
  getOrderDetails() {
    this.api.get_public_parametro('lista_boletas_trasnporte', { "tipo_u":this.tipo_personaa }).then((data_: any) => {
    console.log('dato_lmeg '+JSON.stringify(data_));
      if(data_=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        this.oldOrders = [];
        this.dummyCate= [];
        this.dummy = [];
        data_.forEach((element_: any) => {
          this.oldOrders.push(element_);
          this.dummyCate.push(element_);
        });
      }
    });
  }



  get_detalle_boleta(id:any, Codigo:any) {
    const param: NavigationExtras = {
      queryParams: {
        "Id": id,
        "Detalle_b": Codigo 
      }
    };
    this.util.navigateToPage('detalle-boleta', param);
  }



}

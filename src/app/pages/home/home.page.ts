import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UtilService } from 'src/app/services/util.service';
import { SearchPage } from '../search/search.page';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { ImageModalPage } from '../image-modal/image-modal.page';
// import { Console } from 'console';
import { JsonPipe } from '@angular/common';
import { UtilRootService } from 'src/app/services/util_root.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  config: SwiperOptions={
    slidesPerView: 1.5,
    spaceBetween:20,
    centeredSlides:true
  }
  t_limit_aux:any;
  inter:any=0;
  num: any= '';
  tipo_personaa:any=0;
  estadooo: any= '';  
  servicio_buscar:any;
  limit_t:any;
  t_limit:any;
  dataReturned: any;
  addressTitle: any = '';
  dummy: any[] = [];
  list: any[] = [];
  items_estado: any[] = [];
  distanceType: any = '';
  limit: any=1;
  oldOrders: any[] = [];
  estadoo: any = '';
  Detalle_Buscador: any ='';
  constructor(
    public urilroot: UtilRootService,
    public util: UtilService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    public api: ApiService,
    public cart: CartService,
    private actionSheetController: ActionSheetController
  ) {


     
        this.route.paramMap.subscribe(params => {
          this.estadooo =  params.get('Id')?.toString();
          console.log('idioma home11 1 '+this.estadooo);
          moment.locale(localStorage.getItem('selectedLanguage') || 'es');
          this.items_estado = [];
          this.dummy = [];
          this.oldOrders = [];
          this.getestado();
          console.log('idioma home11 1 1 1  '+this.urilroot.datos_inicioo.tipo_usuario);
          this.tipo_personaa= this.urilroot.datos_inicioo.tipo_usuario;
          this.estadoo=this.estadooo;
          console.log('idioma home11 1 '+JSON.stringify(this.dummy));
          console.log('idioma home11 1 '+JSON.stringify(this.oldOrders));
          this.addressTitle = localStorage.getItem('user_sap');
          this.dummy = Array(10);
          this.getOrderss('', this.estadoo );
        });

  }



  ngOnInit() {

  }

  cargar_datos() {
    this.util.navigateRoot('tabs/home/'+this.estadoo);
  }



  doRefreshh(event:any) {
    moment.locale(localStorage.getItem('selectedLanguage') || 'es');
    this.addressTitle = localStorage.getItem('user_sap');
    setTimeout(() => {
      console.log('Done');
      this.getOrderss(event,  this.estadoo);
      event.target.complete();
    }, 500);
  }





  getOrderss(event:any,estadooo:any) {
    this.api.get_public_parametro('listar_estadol_buscardor',{"id": estadooo } ).then((data_: any) => {
         console.log('Done '+JSON.stringify(data_));
         if(data_=='error'){
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
         }else{
           if(data_.length>0){

            data_.forEach((element_:any) => {
              console.log('log limit ant '+this.limit);
              console.log('log limit ant '+this.oldOrders.length);

              this.servicio_buscar= element_.ServicioBuscar;
              this.Detalle_Buscador= element_.DetalleBuscador;
              this.limit_t= element_.limit;
              this.t_limit=this.limit * element_.limit;
              this.inter= this.limit-1;
              this.inter=this.inter*element_.limit;
              
              this.api.get_public_parametro(element_.Servicio,{"limit": this.t_limit} ).then((data: any) => {
                console.log('Done '+JSON.stringify(data));
               if(data=='error'){
                     this.limit=this.t_limit_aux;
                    console.log('log limit error '+this.t_limit_aux);
                    this.util.errorToast(this.util.translate('No internet connection'), 'danger');
               }else{
                      this.limit = this.limit + 1;
                      console.log('log limit '+this.limit);
                      this.t_limit_aux=this.limit;
                      console.log('log limit aux'+this.t_limit_aux);
                      this.dummy = [];


                     data.forEach((element:any, indexx:any) => {
                     
                      element.cont= this.inter+(indexx+1);
                      if(element.U_IM_NumeroDUI==null){
                        element.DUI=this.util.translate('Sin DIM');
                      }else{
                        element.DUI=element.U_IM_NumeroDUI;
                      }
                   
                      element.COMENTARIO=this.util.translate('Comentario')+' : '+element.Comments;
                      element.Project=this.util.translate('Project')+' : '+element.Project;
                      element.CardName=this.util.translate('CardName')+' : '+element.CardName;

                      this.num = element.SUMA_CANTIDAD;
                      this.num= parseFloat(this.num);
                      element.total=this.util.translate('Total Cantidad')+' : '+this.num;
                      element.AssetDate =moment(element.AssetDate).format('LL');
                      element.DocDate =moment(element.DocDate).format('LL');
                      this.oldOrders.push(element);
                    });
               }
             });


            });

           }

         }
    });
  }






  getestado() {
    this.api.get_public_importaciones_sin_datos('listar_estadol1').then((datag: any) => {
         if(datag=='error'){
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
         }else{
          this.items_estado = [];
          this.items_estado = datag;
         }
    });
  }


  sliderOpt = {
    zoom: {
      maxRatio: 1,
    },
  };

























































  Alerta_sin_Dim() {
    this.util.showToast('La Factura Comercial Todavía no esta Nacionalizada', 'danger', 'bottom');
  }

  openDetails(id: any) {
    const param: NavigationExtras = {
      queryParams: {
        "id": id,
        "Estado": this.estadoo
      }
    };
    this.util.navigateToPage('listar-items-eg', param);
  }


  async registrar_fotos_y_comentarios(DocEntry: any) {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Registrar Fotos de la Factura'),
        role: 'destructive',
        icon: 'image-outline',
        handler: () => {
          const param: NavigationExtras = {
            queryParams: {
              "DocEntry": DocEntry,
              "Estado": this.estadoo
            }
          };
          this.util.navigateToPage('registro-imagen-y-comentario-fnc', param);
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




  async registrar_fotos_y_comentarios_dos(DocEntry: any) {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose Action'),
      mode: 'ios',
      buttons: [{
        text: this.util.translate('Registrar Fotos de la Factura'),
        role: 'destructive',
        icon: 'image-outline',
        handler: () => {
          const param: NavigationExtras = {
            queryParams: {
              "DocEntry": DocEntry,
              "Estado": this.estadoo
            }
          };
          this.util.navigateToPage('registro-imagen-y-comentario-fnc-dos', param);
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

  




  async openSearch() {
    const modal = await this.modalController.create({
      component: SearchPage,
      backdropDismiss: false,
      componentProps:{
        "id": this.estadoo,
        "limit": this.limit_t,
        "Servicio_buscar": this.servicio_buscar,
        "Descripcion":this.Detalle_Buscador
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        console.log('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }








}

import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute ,NavigationExtras } from '@angular/router';
import { ModalController, ActionSheetController, NavParams, IonInput } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { zip } from 'rxjs';
import { UtilRootService } from 'src/app/services/util_root.service';
import { event } from 'jquery';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  inputModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;



  inter:any=0;
  t_limit:any;
  t_limit_aux:any=1;
  num: any= '';
  oldOrders: any[] = [];
  dummy: any[] = [];
  limit: any=0;
  limit_d: any=1;
  tipo_personaa:any='';
  parametros : any;
  valor_b: any = '';
  valor_b1: any = '';
  searchContent: any = '';
  list: any[] = [];
  distanceType: any = '';
  estadoo: any='0';
  Descripcion: any= '';
  addressTitle: any = '';
  constructor(
    public urilroot: UtilRootService,
    private modalCrtl: ModalController,
    public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController
    
  ) {  
    this.dummy = [];
    this.oldOrders = [];
    moment.locale(localStorage.getItem('selectedLanguage') || 'es');
    this.parametros =  this.navParams.data;
    this.estadoo= this.parametros.id;
    console.table('tr '+JSON.stringify((this.parametros.id)));
    console.table('tr '+JSON.stringify((this.parametros.limit)));
    console.table('tr '+JSON.stringify((this.parametros.Servicio_buscar)));
    console.table('tr '+JSON.stringify((this.parametros.Descripcion)));
    this.Descripcion= this.parametros.Descripcion;
    console.log('idioma home11 1 '+this.urilroot.datos_inicioo.tipo_usuario);
    this.tipo_personaa= this.urilroot.datos_inicioo.tipo_usuario;
   }

  ngOnInit() {
    
   
  }

  onClose() {
    this.oldOrders = [];
    this.modalCrtl.dismiss();
  }


  
  doRefreshh(event:any) {
    moment.locale(localStorage.getItem('selectedLanguage') || 'es');
    this.addressTitle = localStorage.getItem('user_sap');
    setTimeout(() => {
      console.log('Done');
      this.onSearchChangee();
      event.target.complete();
    }, 500);
  }
  

  onInpu(ev:any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9-]+/g, '');
    console.log('json  existe 0 0 0 '+filteredValue);
    this.ionInputEl.value = this.inputModel = filteredValue.toUpperCase();
  }

    onSearchChangee() {
    if (this.valor_b != '') {
    if(this.valor_b==this.valor_b1){
      this.valor_b1=this.valor_b;
    }else{
      this.valor_b1=this.valor_b;
      this.oldOrders = [];
      this.limit_d=1;
    }
    
  
  
    this.t_limit=this.limit_d * this.parametros.limit;
    this.inter= this.limit_d-1;
    this.inter=this.inter*this.parametros.limit;
  
      this.api.get_public_parametro(this.parametros.Servicio_buscar,{"limit": this.t_limit,"valor": this.valor_b } ).then((data: any) => {
        console.log('Done '+JSON.stringify(data));
          if(data=='error'){
            this.limit_d=this.t_limit_aux;
            console.log('log limit error '+this.t_limit_aux);
                    this.util.errorToast(this.util.translate('No internet connection'), 'danger');
          }else{
            this.limit_d = this.limit_d + 1;
            console.log('log limit '+this.limit_d);
            this.t_limit_aux=this.limit_d;
            console.log('log limit aux'+this.t_limit_aux);

                
                    this.dummy = [];
                    data.forEach((element:any,indexx:any) => {
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
  }else{
    this.valor_b='';
    this.valor_b1='';
    this.dummy = [];
    this.oldOrders = [];
  }

}




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
    this.modalCrtl.dismiss();
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
          this.modalCrtl.dismiss();
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
          this.modalCrtl.dismiss();
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

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
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { UtilRootService } from 'src/app/services/util_root.service';
import { data } from 'jquery';
import * as $ from 'jquery';

@Component({
  selector: 'app-detalle-boleta',
  templateUrl: './detalle-boleta.page.html',
  styleUrls: ['./detalle-boleta.page.scss'],
})
export class DetalleBoletaPage implements OnInit {
  tipo_personaa:any='';
  detalle_detalle:any='';
  cateId: any = '';
  apiCalled: boolean = false;
  categories: any[] = [];
  services: any[] = [];
  Id_Boleta:any='';
  codigo_boleta:any='';
  comentario:any='';
  pesoo_sap:any='';
  pesoo_sap_:any='';
  pesoo_balanza_neto:any='';
  pesoo_balanza_neto_:any='';
  pesoo_resta:any='';
  limit_dife:any='';
  cantidad_p1:any=0;
  AB     : any ='';
  dummy: any[] = [];
  condi:any=0;
  constructor( 
    public urilroot: UtilRootService,
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController) { 
      
      this.route.queryParams.subscribe((data: any) => {
        if (data && data.Id  && data.Detalle_b) {
          console.log('iop '+data.Id);
          console.log('iop '+data.Detalle_b);
          this.condi=0;
          this.dummy = Array(10);
          this.util.select_boleta_transporte=[];
          this.tipo_personaa= this.urilroot.datos_inicioo.tipo_usuario;
          this.Id_Boleta= data.Id;
          this.codigo_boleta= data.Detalle_b;

          this.util.validar_datos_despachador=[];
          this.util.validar_datos_despachador=JSON.parse(localStorage.getItem("validar_despachador") || "[]");
          console.log('iop 10 '+JSON.stringify(this.util.validar_datos_despachador));

          this.util.validar_total_item=[];
          this.util.validar_total_item=  this.util.validar_datos_despachador.filter(function(hero:any) {
            return  hero.idboleta==data.Id;
          });

          this.util.validar_total_item.forEach(o => {
            this.util.select_boleta_transporte.push(o.IdDBItem);
          });

          console.log('iop 20 '+JSON.stringify(this.util.validar_total_item));
          console.log('iop 30 '+JSON.stringify(this.util.select_boleta_transporte));
          this.AB=localStorage.getItem('descripcion_2');
          this.getItems();
        }
      });
  }


  getItems() {
   
    
    this.api.get_public_parametro('lista_detalle_boletas_trasnporte', { "id_boleta":  this.Id_Boleta }).then((data_: any) => {
      if(data_=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        this.services = [];
        this.dummy = [];
        if(data_!=0){

          data_.forEach((element_: any) => {
            this.comentario= element_.Comentario;
            this.pesoo_sap=parseFloat(element_.Peso);
            this.pesoo_sap= this.pesoo_sap.toLocaleString('es-MX'); // 12,000
            this.pesoo_balanza_neto= parseFloat(element_.peso_neto);
            this.pesoo_balanza_neto= this.pesoo_balanza_neto.toLocaleString('es-MX'); // 12,000
            this.cantidad_p1= parseFloat(element_.Cantidad);
            element_.Cantidad = this.cantidad_p1.toLocaleString('es-MX'); // 12,000
            console.log('iop uno '+element_.Id);
            this.services.push(element_);
          });

          console.log('iop uno val 0 '+JSON.stringify(this.util.validar_datos_despachador));
          console.log('iop uno val 1 '+JSON.stringify(this.util.validar_total_item));
          console.log('iop uno val 2 '+JSON.stringify(this.util.select_boleta_transporte));
         

        }
      }
    });



  }



  checkChange(event:any, id:any, IdMercaderia:any , condi:any) {
    const valopy = event.detail.checked;
    console.log('iop   ckec 00  '+id);
    console.log('iop   ckec 00  '+JSON.stringify(event));
    console.log('iop   ckec 00  '+valopy);
    console.log('iop   ckec 00  '+IdMercaderia);
    console.log('iop   ckec 00  '+condi);
    if(valopy == true) {
        console.log('iop  saliendo a otra ventana '+JSON.stringify(this.util.validar_total_item));
        localStorage.setItem("validar_despachador",JSON.stringify(this.util.validar_total_item));
        this.registrar_fotos_y_comentarios(id, IdMercaderia, 1);
    }else{
      console.log('iop   ckec 0 '+JSON.stringify(this.util.validar_datos_despachador));
      console.log('iop   ckec 1 '+JSON.stringify(this.util.validar_total_item));
      this.util.validar_total_item=  this.util.validar_total_item.filter(function(hero:any) {
        return  hero.IdDBItem!=id;
      });
      console.log('iop   ckec 2 '+JSON.stringify(this.util.validar_total_item));
      localStorage.setItem("validar_despachador",JSON.stringify(this.util.validar_total_item));
      this.util.select_boleta_transporte= this.util.select_boleta_transporte.filter(x => x != id);
      console.log('iop   ckec 3 '+JSON.stringify(this.util.select_boleta_transporte));
    }
  }









  ngOnInit() {
  }

  onBack() {
    const param: NavigationExtras = {
      queryParams: {
        "Id": 10
      }
    };
    this.util.navigateToPage('lista-boleta-transporte', param);
  }

  async ber(img:any) {
    const modal1= await this.modalController.create({
      component:ImageModalPage,
      componentProps:{
        img
      },
      cssClass:'transparent-modal'
    });
    return await modal1.present();
  }















  onSave() {
    this.presentAlert();
  }


async presentAlert() {
  const alert = await this.alertController.create({
    header: this.util.translate('Verificación de los Item  -  Boleta de Transporte'),
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
    this.util.show(this.util.translate('Confirmando Item de Boleta de Transporte...'));
    const param = {
      id_boleta: this.Id_Boleta,
      user:  localStorage.getItem('user_sap'),
    };
    this.api.insert_datos_json('confirmar_item_boleta', param).then((data_r: any) => {
      if (data_r!='error') {
        if(data_r>0){
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



    
  async registrar_fotos_y_comentarios(idg:any, IdMercaderia: any, posi:any ) {
    if(posi==1){
        this.detalle_detalle="Registrar Fotos del item de Boleta";
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
              "Id_item": idg,
              "Id": IdMercaderia,
              "posi":posi,
              "Id_Boleta":this.Id_Boleta,
              "codigo_boleta":this.codigo_boleta
            }
          };
          this.util.navigateToPage('registro-imagen-y-comentario-item-boleta-despachador', param);
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          console.log('iop   ckec 3 cancel '+idg);
          $("#"+idg).prop("checked", false);
        }
      }]
    });
    await actionSheet.present();
  }

}

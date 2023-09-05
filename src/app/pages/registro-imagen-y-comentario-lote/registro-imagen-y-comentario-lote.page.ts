

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { argThresholdOpts } from 'moment';
import { ModalController,AlertController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { JsonPipe } from '@angular/common';
import { ListaEstadosFacturaPage } from '../lista-estados-factura/lista-estados-factura.page';
import { NavigationExtras } from '@angular/router';
import { UtilRootParam } from 'src/app/services/util_root.param';


@Component({
  selector: 'app-registro-imagen-y-comentario-lote',
  templateUrl: './registro-imagen-y-comentario-lote.page.html',
  styleUrls: ['./registro-imagen-y-comentario-lote.page.scss'],
})
export class RegistroImagenYComentarioLotePage implements OnInit {
  posi:any='';
  
  id__:any='';
  docentry__:any='';
  linenum__:any='';
  itemcode__:any='';


  Disnumber:any='';
  vista:any='';
  arrayy:any[] = [];


  images: any[] = [];
  short_message: any = '';
  lista_estado_fact: any[] = [];
  submitted: boolean = false;
  old_ListaEstadoF: any[] = [];
  constructor(  
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute,
    public urilparam: UtilRootParam,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController) {    
      
      this.route.queryParams.subscribe((data: any) => {
      console.log('datos info '+JSON.stringify(data));
      if (data && data.id_ && data.docentry_ && data.linenum_  && data.itemcode_ &&  data.Disnumber &&  data.posi && data.vista ) {
        
        this.id__= data.id_;
        this.docentry__= data.docentry_;
        this.linenum__= data.linenum_;
        this.itemcode__= data.itemcode_;

        this.Disnumber=data.Disnumber;
        this.posi= data.posi;
        this.vista= data.vista;

        this.util.show(this.util.translate('Cargando Información..'));
        this.get_detalle_lote();
      
      }

     });
    
    }


   ngOnInit() {
   }





   onBack() {

      const param: NavigationExtras = {
        queryParams: {
          "Id": this.id__,
          "Docentry": this.docentry__,
          "Linenum":this.linenum__,
          "Itemcode" :this.itemcode__,
        }
      };
  
      this.util.navigateToPage('lista-lotes-item', param);
   }





   

  get_detalle_lote(){

    this.util.hidee();
    this.api.get_public_parametro('get_detalle_lote', { "iddbitem": this.id__,"Disnumber":this.Disnumber }).then((data_df: any) => {
      if(data_df=='error'){
        this.util.hidee();
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        if(data_df.length>0){
            data_df.forEach((elementt_:any) => {
            this.old_ListaEstadoF.push(elementt_);
            });
            this.util.hidee();
            this.short_message='';
            this.images=[];
            this.lista_estado_fact=[];
        }else{
          this.util.hidee();
        }
      }
    });
  }





  async uploadImage() {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose from'),
      buttons: [{
        text: this.util.translate('Camera'),
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.upload(CameraSource.Camera);
        }
      }, {
        text: this.util.translate('Gallery'),
        icon: 'images',
        handler: () => {
          console.log('gallery clicked');
          this.upload(CameraSource.Photos);
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



  
  async upload(source: CameraSource) {
    console.log('open', source);
    try {
      const image = await Camera.getPhoto({
        source,
        quality: 50,
        resultType: CameraResultType.Base64
      });
      console.log('image output', image);
      if (image && image.base64String) {
        const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
        this.util.show(this.util.translate('Uploading..'));
        console.log(image.format);

        this.api.uploadImage('uploadImage', blobData,image.format, this.api.mediaURL1__).then((data_image) => {

            if(data_image=='error'){
              this.util.hidee();
              this.util.errorToast(this.util.translate('No internet connection'), 'danger');
            }else{

              console.log('image upload', data_image);
              this.util.hidee();
               if (data_image==0 || data_image==1) {
              
   
                 console.log('NO image selected');
                 if(data_image==0){
                   this.util.errorToast(this.util.translate('Error, el archivo no es una imagen'), 'danger');
                 }else{
                   if(data_image==1){
                     this.util.errorToast(this.util.translate('Error, el tamaño máximo permitido es un 1MB'), 'danger');
                   }
                 }
               } else {
                 this.images.push(data_image);
                 console.log('this cover', this.images);
                 
               }
            }

        });
      }
    } catch (error) {
      console.log(error);
      this.util.apiErrorHandler(error);
    }
  }




  b64toBlob(b64Data:any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  onSave() {
    this.submitted = true;
       if(this.images.length>0){
        if(this.lista_estado_fact.length>0 ){
          this.presentAlert();
        }else{
          this.util.errorToast('Necesita seleccionar una estado de la Factura');
        }
       }else{
           this.util.errorToast('Necesita subir al menos una imagen');
       }
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.util.translate('Registro Detalle'),
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






  callApi() {
    this.util.show(this.util.translate('Registrando Información..'));
    const param = {
      IdDBitem: this.id__,
      disnumber: this.Disnumber,
      short_message: this.short_message,
      images: this.images,
      estados:this.lista_estado_fact,
      lugarc:this.vista,
      user:  localStorage.getItem('user_sap')
    }
      console.log('datos_F  '+JSON.stringify(param));
      this.api.insert_datos_json('insertar_detalle_lote_', param).then((data_001: any) => {
      console.log('datos_F  '+data_001);
      if (data_001!='error') {
        if(data_001!=0){
        this.old_ListaEstadoF=[];


        this.get_detalle_lote();
        }else{
          this.util.hidee();
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
        }
      }else{
        this.util.hidee();
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }
    });
  }





  async open_estado_factura() {
    const modal = await this.modalController.create({
      component: ListaEstadosFacturaPage,
      componentProps: { lista_estado_fact: this.lista_estado_fact }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.lista_estado_fact = data.data;
      }
    });
    await modal.present();
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
















}

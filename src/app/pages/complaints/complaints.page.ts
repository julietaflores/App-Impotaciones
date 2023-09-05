import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { argThresholdOpts } from 'moment';
import { ModalController,AlertController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
// import { ignoreElements } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
  id: any = '';
  id_articulo:any='';
  apiCalled: boolean = false;
  storeName: any = '';
  storeAddress: any = '';
  suma_cantidad: any = 0;
  diferencia_: any = 0;
  diferencia_aux_: any = 0;
  valor_diferencia: string = '';
  aux: any = 0;
  registro_parcial: boolean = false;
  datos_articulo:any='';
  nombre_articulo:any='';
  total_cantidad:any='';
  total_ca_llegada:any='';
  number1: string = '';
  drt:Boolean=false;
  number2: string = '';
  storeCover: any = '';
  storeMobile: any = '';
  storeEmail: any = '';
  storeUID: any = '';
  items: any[] = [];
  driverName: any = '';
  driverId: any = '';
  driverCover: any = '';
  driverEmail: any = '';
  driverMobile: any = '';
  haveDriver: boolean = false;

  images: any[] = [];

  submitted: boolean = false;
  oldOrders: any[] = [];
  lista_detalle: any[] = [];
  issue_with: any = '';
  reason_id: any = '';
  service_id: any = '';
  cantidad_llegada: any = '';
  short_message: any = '';
  status: any = '';
  loaded?: boolean;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log('datos info '+JSON.stringify(data));
      if (data && data.id && data.id_articulo) {
        this.id = data.id;
        this.id_articulo= data.id_articulo;
        this.util.show(this.util.translate('Cargando Información..'));
        this.getOrderDetails_();
      }
    });
  }

  ngOnInit() {
  }








  getOrderDetails_() {
    this.apiCalled = false;


    this.api.get_public_parametro('get_log_tiporegistro', { "DocEntry": this.id , "LineNum": this.id_articulo}).then((datap_: any) => {
      console.log('validar tipode registro '+JSON.stringify(datap_));
         if(datap_=='error'){
          this.util.hidee();
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
         }else{


          datap_.forEach((elementpp_:any) => {
            if(elementpp_.existe==0){
             console.log('existe cero');
              this.registro_parcial=false;
            }else{
               if(elementpp_.RegistroParcial==1){
                  this.registro_parcial=true;
               }else{
                  this.registro_parcial=false;
               }
            }
         });




         this.api.get_public_parametro('factura_nacionalizada_x_docentry_x_articulo', { "id": this.id , "LineNum": this.id_articulo}).then((data_: any) => {
          console.log('lista_data '+JSON.stringify(data_));
    
          if(data_=='error'){
            this.util.hidee();
            this.util.errorToast(this.util.translate('No internet connection'), 'danger');
          }else{
            this.apiCalled = true;
            data_.forEach((element_:any) => {
            
                this.storeName = element_.DocNum;
                this.storeAddress = element_.U_IM_NumeroDUI;
                this.datos_articulo= element_.ItemCode;
                this.nombre_articulo=element_.Dscription;
                this.total_cantidad= element_.Quantity;
             
    
      
      
                this.api.get_public_parametro('total_lista_detalle_doc_entry_linenum', { "DocEntry": this.id , "LineNum": this.id_articulo, "valor_t": this.total_cantidad  }).then((dataaa_: any) => {
                  console.log('lista_data 1 '+JSON.stringify(dataaa_));
                
                  if(dataaa_=='error'){
                    this.util.hidee();
                    this.util.errorToast(this.util.translate('No internet connection'), 'danger');
                  }else{
                    dataaa_.forEach((elementtt_:any) => {
                      this.suma_cantidad=  elementtt_.Cantidad_total;
                      this.diferencia_= elementtt_.diferencia;
                      this.diferencia_aux_= this.diferencia_;
                      this.valor_diferencia= this.diferencia_;
         
                       this.drt = this.valor_diferencia.includes(',');
                       console.log('validar '+this.drt);
         
                       var num:Boolean = this.drt;
                       while(num == true) { 
                         console.log('campo 000 ' +this.valor_diferencia);
                          const posi = this.valor_diferencia.search(',');
                          console.log('posi '+posi);
                          const newStr0 = this.valor_diferencia.substring(0,posi);
                          const newStr1 = this.valor_diferencia.substring(posi+1,this.valor_diferencia.length);
                          const newStr2= newStr0+newStr1;
                          this.valor_diferencia = newStr2;
                          console.log('actualizado '+this.valor_diferencia);
                          this.drt = this.valor_diferencia.includes(',');
                          num=this.drt;
                       } 
             
         
         
                       
                      this.diferencia_aux_= this.valor_diferencia;
         
           
                      console.log('campo 0010 ' +this.diferencia_);
                      console.log('campo 0011 ' +this.diferencia_aux_);
                      console.log('campo 0012 ' +this.registro_parcial);
                   
                      this.api.get_public_parametro('lista_detalle_doc_entry_linenum', { "DocEntry": this.id , "LineNum": this.id_articulo}).then((dataa_: any) => {
                       console.log('campo 00 ' +JSON.stringify(dataa_));
                        if(dataa_=='error'){
                          this.util.hidee();
                          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
                        }else{
                          this.lista_detalle = [];
                          if(dataa_.length>0){
                              dataa_.forEach((elementt_:any) => {
                              this.oldOrders.push(elementt_);
                              this.lista_detalle.push(elementt_);
                              this.util.hidee();
                            });
                          }else{
                            this.util.hidee();
                          }
                        }
                     });
         
         
         
                     });
                  }
    
    
                
                });
      
      
      
               
            });
          }
    
       
        });






         }








    });



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







  onBack() {
    this.util.onBack();
  }







  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.util.translate('Registro Detalle'),
      message: this.util.translate('Esta seguro de registrar esta cantidad llegada: '+ this.cantidad_llegada+' ?'),
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












  onSave() {
    this.submitted = true;


      if (this.cantidad_llegada != '' && this.registro_parcial) {
        if(this.cantidad_llegada != null){
           if(this.cantidad_llegada > 0){
               if(this.images.length>0){
                console.log('cantida r '+this.cantidad_llegada);
                console.log('diferencia '+this.diferencia_);
                console.log('diferencia aux '+this.diferencia_aux_);
                if( (this.cantidad_llegada) <= (this.diferencia_aux_)){
                  this.presentAlert();
                }else{
                 this.util.errorToast('El valor excede la Cantidad');
                }
               }else{
                 this.util.errorToast('Necesita subir al menos una imagen');
               }
           }else{
            this.util.errorToast('El valor es menor a Cero');
           }
        }else{
          this.util.errorToast('Valor no valido');
        }
     
    } else {


    //  alert('cdc');
      if (this.cantidad_llegada == '' && !this.registro_parcial) {
        if(this.images.length>0){
          this.cantidad_llegada= this.diferencia_;
         
          this.presentAlert();
         }else{
           this.util.errorToast('Necesita subir al menos una imagen');
         }
      }else{
        this.util.errorToast('All fields are required');
      }
     
    }
  }















  callApi() {

    this.util.show(this.util.translate('Registrando Información..'));


    const param = {
      docentry: this.id,
      linenum:this.id_articulo,

      DocNum: this.storeName,
      U_IM_NumeroDUI: this.storeAddress,
      ItemCode: this.datos_articulo,
      Dscription:  this.nombre_articulo,
      user:  localStorage.getItem('user_sap'),


      cantidad_llegada: this.cantidad_llegada,
      short_message: this.short_message,
      images: (this.images)
    }
    console.log(param);

    this.api.insert_datos_json('insertar_docentry_item', param).then((data_001: any) => {
      console.log('campo valor _1'+data_001);
   
      if (data_001!='error') {

        if(data_001!=0){
          this.api.get_public_parametro('get_log_tiporegistro', { "DocEntry": this.id , "LineNum": this.id_articulo}).then((datap_: any) => {
            console.log('validar tipode registro '+JSON.stringify(datap_));
             if(datap_=='error'){
              this.util.hidee();
              this.util.errorToast(this.util.translate('No internet connection'), 'danger');
             }else{
              datap_.forEach((elementpp_:any) => {
                if(elementpp_.existe==0){
                   this.validar_registro_parcial();
                   this.util.hidee();
                   this.util.showSimpleAlert__('Proceso registrado correctamente');
                }else{
                   if(elementpp_.RegistroParcial==1){
                      this.registro_parcial=true;
                   }else{
                      this.registro_parcial=false;
                   }  
                   this.util.hidee();
                   this.util.showSimpleAlert__('Proceso registrado correctamente');
                }
             });
   
             }
          });
        }else{
          this.util.hidee();
          console.log('aqui cero');
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
        }
    
       
      }else{
        this.util.hidee();
        console.log('aqui cero');
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }


    });
  }




  validar_registro_parcial() {
    const datos_log_rm = {
      DocEntry: this.id,
      LineNum: this.id_articulo,
      RegistroParcial: this.registro_parcial == false?0:1
    };
    this.api.insert_log1('registrar_log_tiporegistro', datos_log_rm).then((data_recepcion_1: any) => {
       if(data_recepcion_1=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
       }else{
        console.log('estado_registro 0'+data_recepcion_1);
       } 
    });
  }



  async preguntar_registro_parcial() {
    const alert = await this.alertController.create({
      header: this.util.translate('Tipo de Registro'),
      message: this.util.translate('Esta seguro de habilitar el registro parcial?'),
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
            this.util.show(this.util.translate('Registrando Información..'));

            this.registro_parcial=true;
            console.log('Confirm Okay');
            const datos_log_rm = {
              DocEntry: this.id,
              LineNum: this.id_articulo,
              RegistroParcial: 1
            };
            this.api.insert_log1('registrar_log_tiporegistro', datos_log_rm).then((data_recepcion_1: any) => {
               if(data_recepcion_1=='error'){
                this.util.hidee();
                this.util.errorToast(this.util.translate('No internet connection'), 'danger');
               }else{
                this.util.hidee();
                console.log('estado_registro 0'+data_recepcion_1);
               } 
            });

          }
        }
      ]
    });
    await alert.present();
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

        this.api.uploadImage('uploadImage', blobData,image.format, this.api.mediaURL__).then((data_image) => {

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
}

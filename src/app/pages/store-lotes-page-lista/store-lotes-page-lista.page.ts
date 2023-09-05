import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,ActionSheetController,} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { detalle_re } from 'src/app/interfaces/detalle_re';
import * as $ from 'jquery';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-store-lotes-page-lista',
  templateUrl: './store-lotes-page-lista.page.html',
  styleUrls: ['./store-lotes-page-lista.page.scss'],
})
export class StoreLotesPageListaPage implements OnInit {
  detalle_detalle:any='';
  rr:any='';
  cantidad_actual: any= 0;
  cantidad_registrada: any=0;
  calculoo:any='';
  limit: any=1;
  extension: any=15;
  le_aux:any=0;
  saveLotes: any[] = [];
//  savedLotesId: any[] = [];
  apiCalled: boolean = false;
  Lotes: any[] = [];
  dummyCate: any[] = [];
  detalle_re:   detalle_re = { id_detalle: '', cantidad: '' };


  cantidad_pendiente_l: any= '';
  cantidad_pendiente_num_l: any= 0;

  cantidad_pendiente_d: any= '';
  cantidad_pendiente_num_d: any= 0;


  valor_cantidad:string | undefined = '';
  constructor( 
    private modalController: ModalController,
    private navParam: NavParams,
    public api: ApiService,
    private actionSheetController: ActionSheetController,
    public util: UtilService) 
    { 

      this.saveLotes = this.navParam.get('lotes');
      this.util.lotes_auxiliar_v1 = [...new Set(this.saveLotes.map(item => item.Id))];
      console.log('fff2_ '+JSON.stringify(this.saveLotes));
      console.log('fff2_ '+JSON.stringify(this.util.lotes_auxiliar_v1));
      this.getmercancia_registrada('',false);

    }



    doRefresh(event:any) {
      console.log(event);
      this.limit = this.limit + 1;
      console.log('dato_lmeg '+JSON.stringify(event));
      console.log('dato_lmeg '+this.limit);
      this.getmercancia_registrada(event, true);
    }
  



    getmercancia_registrada(event:any,haveRefresh:any) {
      
      this.apiCalled = false;
      this.le_aux= this.limit*this.extension;
      console.log('dato_lmeg '+this.le_aux);
       this.api.get_public_parametro('listar_estacion_guaracachi_docentry_total', { "limit":  this.le_aux }).then((data: any) => {

        if(data=='error'){
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
        }else{
  
          this.Lotes = [];
          this.dummyCate =[];
          this.apiCalled = true;
          if(data.length>0){
 
            this.Lotes = data;
            this.dummyCate = data;


            this.Lotes.forEach((element__) => {
              this.cantidad_pendiente_l= element__.CantidadPendiente;
              this.cantidad_pendiente_num_l= parseFloat(this.cantidad_pendiente_l);
              element__.CantidadPendiente= this.cantidad_pendiente_num_l;
            });

            this.dummyCate.forEach((element__) => {
              this.cantidad_pendiente_d= element__.CantidadPendiente;
              this.cantidad_pendiente_num_d= parseFloat(this.cantidad_pendiente_d);
              element__.CantidadPendiente= this.cantidad_pendiente_num_d;
            });


            this.Lotes.forEach((element) => {
              if (this.util.lotes_auxiliar_v1.includes(element.Id)) {
                 this.Lotes= this.Lotes.filter(an => an.Id != element.Id);
              }
             });
             this.Lotes= this.saveLotes.concat(this.Lotes);


             this.dummyCate.forEach((element) => {
              if (this.util.lotes_auxiliar_v1.includes(element.Id)) {
                 this.dummyCate= this.dummyCate.filter(an => an.Id != element.Id);
              }
             });
             this.dummyCate= this.saveLotes.concat(this.dummyCate);
             if (haveRefresh) {
              event.target.complete();
             }


          }
         
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
  

  
   
  
  
  

    onSearchChange(event:any) {
      console.log(event.detail.value);
      this.Lotes = this.dummyCate.filter((ele: any) => {
        return ele.Descripcion.toLowerCase().includes(event.detail.value.toLowerCase());
      });
    }
  




    ngOnInit() {
    }
  




    checkChange(event:any, id:any) {
      console.log('fff1_ '+id);
      console.log('fff1_ '+$('#'+id).val());
      console.log('fff1_ '+JSON.stringify(event));
      console.log('fff1_ '+event.detail.checked);
    

      if(event && event.detail && event.detail.checked == true) {
        if($('#'+id).val()==0){
          this.util.errorToast(this.util.translate('Falta registrar cantidad'), 'danger');
          console.log('fff1_ '+event.target.checked);
          event.target.checked= false;
        }else{

          console.log('fff1_ '+$('#'+id).val());
          console.log('fff1_ '+$('#'+id+'_cantidadpendiente').val());

          this.cantidad_actual= 0;
          this.cantidad_registrada= 0;
          this.cantidad_actual= $('#'+id).val();
          this.cantidad_registrada= $('#'+id+'_cantidadpendiente').val();

          console.log('fff1_ '+parseFloat(this.cantidad_actual));
          console.log('fff1_ '+parseFloat(this.cantidad_registrada));

          var uno=parseFloat(this.cantidad_actual);
          var dos=parseFloat(this.cantidad_registrada);
           this.rr= (dos-uno);
          

          this.calculoo= parseFloat(this.rr);
          console.log('fff1_ '+this.calculoo);
          console.log('fff1_ '+'--------------');

          if(this.calculoo>=0){
             this.valor_cantidad= $('#'+id).val()?.toString();
           // this.savedLotesId.push(id); 
             this.util.lotes_auxiliar_v1.push(id);
             event.target.checked= false;
             this.registrar_fotos_y_comentarios(id,1,2);
          }else{
             event.target.checked= false;
             this.util.errorToast(this.util.translate('La cantidad Actual excede a la Cantidad Total Actualmente !!!'), 'danger');
          }

        }
      }else{
        this.util.lotes_auxiliar_v1 = this.util.lotes_auxiliar_v1.filter(x => x != id);
      }
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
         //   this.selected();
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

  
    close() {
      this.modalController.dismiss('close', 'close');
    }
  





    selected() {
      console.log(this.util.lotes_auxiliar_v1);
      let selected_mercancia: any[] = [];
      this.Lotes.forEach((element) => {
        if (this.util.lotes_auxiliar_v1.includes(element.Id)) {
          element.Cantidad_Envio= $('#'+element.Id).val();
          selected_mercancia.push(element);
        }
      });
      this.modalController.dismiss(selected_mercancia, 'ok');
    }







}

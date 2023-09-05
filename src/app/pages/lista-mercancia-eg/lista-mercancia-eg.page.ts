import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController,} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { detalle_re } from 'src/app/interfaces/detalle_re';
import * as $ from 'jquery';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UtilRootParam } from 'src/app/services/util_root.param';
import { datos_param } from 'src/app/interfaces/datos_param';



@Component({
  selector: 'app-lista-mercancia-eg',
  templateUrl: './lista-mercancia-eg.page.html',
  styleUrls: ['./lista-mercancia-eg.page.scss'],
})
export class ListaMercanciaEgPage implements OnInit {
  detalle_detalle:any='';
  posii:any='';

  rr:any='';
  cantidad_actual: any= 0;
  cantidad_registrada: any=0;
  calculoo:any='';
  limit: any=1;
  extension: any=15;
  le_aux:any=0;
  saveLotes: any[] = [];
  savedLotesId: any[] = [];
  savedLotesIdd: any[] = [];
  apiCalled: boolean = false;
  Lotes: any[] = [];
  Lotes_relleno: any[] = [];
  Lotes1: any[] = [];
  Lotes2: any[] = [];
  dummyCate: any[] = [];
  dummyCate1: any[] = [];
  dummyCate2: any[] = [];
  detalle_re:   detalle_re = { id_detalle: '', cantidad: '' };


  cantidad_pendiente_l: any= '';
  cantidad_pendiente_num_l: any= 0;

  cantidad_pendiente_d: any= '';
  cantidad_pendiente_num_d: any= 0;


  valor_cantidad:string | undefined = '';
  constructor(private modalController: ModalController,
    public api: ApiService,
    private route: ActivatedRoute,
    public urilparam: UtilRootParam,
    private actionSheetController: ActionSheetController,
    public util: UtilService) {  

      this.route.queryParams.subscribe((data: any) => {
        console.log('datos info '+JSON.stringify(data));
        if (data && data.posii) {
          this.posii=data.posii;
           const datoss= this.urilparam.datos_paramm;
           console.log('fff2_45 '+ JSON.stringify(datoss));    
           console.log('fff2_45 '+JSON.stringify(this.util.lotes_auxiliar_v1));
           console.log('fff2_45 '+JSON.stringify(this.util.lotes_auxiliar_v2));
           console.log('fff2_45 '+JSON.stringify(this.util.lotes_auxiliar_v3));
           this.getmercancia_registrada('',false);
        }
       });
    
     
}

  ngOnInit() {
  
  
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




            if(this.util.lotes_auxiliar_v3.length>0){
              console.log('fff2_455 '+JSON.stringify(this.util.lotes_auxiliar_v3));

         
              this.util.lotes_auxiliar_v3.forEach((element) => {
                this.Lotes1= this.Lotes.filter(an => an.Id == element.id_ );
                this.Lotes1[0].Cantidad_Envio = element.cantidad_;


                this.util.lotes_auxiliar_v1.push(element.id_);
                console.log('fff2_455 '+JSON.stringify(this.Lotes1));
               });
    
    
               this.util.lotes_auxiliar_v3.forEach((element) => {
                this.Lotes2= this.Lotes.filter(an => an.Id != element.id_);
               });

                this.Lotes= this.Lotes1.concat(this.Lotes2);


               this.util.lotes_auxiliar_v3.forEach((element) => {
                   this.dummyCate1= this.dummyCate.filter(an => an.Id == element.id_);
                   this.dummyCate1[0].Cantidad_Envio = element.cantidad_;
               });
               this.util.lotes_auxiliar_v3.forEach((element) => {
                this.dummyCate2= this.dummyCate.filter(an => an.Id != element.id_);
            });
                
    
                  this.dummyCate= this.dummyCate1.concat(this.dummyCate2);

            }
       





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




  checkChange(event:any, id:any) {
    console.log('fff1_ '+'*****');
    console.log('fff1_ '+id);
    console.log('fff1_ '+$('#'+id).val());
    console.log('fff1_ '+JSON.stringify(event));
    console.log('fff1_ '+event.detail.checked);
    const valopy = event.detail.checked;
    console.log('fff1_ '+valopy);
    console.log('fff1_ '+'*****');
 
    //if(event && event.detail && event.detail.checked == true) {

      if(valopy == true) {

      if($('#'+id).val()==0){
        event.target.checked= false;
        this.util.errorToast(this.util.translate('Falta registrar cantidad'), 'danger');
      }else{
        this.cantidad_actual= 0;
        this.cantidad_registrada= 0;
        this.cantidad_actual= $('#'+id).val();
        this.cantidad_registrada= $('#'+id+'_cantidadpendiente').val();
        var uno=parseFloat(this.cantidad_actual);
        var dos=parseFloat(this.cantidad_registrada);
        this.rr= (dos-uno);
        this.calculoo= parseFloat(this.rr);

        if(this.calculoo>=0){
           this.valor_cantidad= $('#'+id).val()?.toString();
           localStorage.setItem('id_', id);
           localStorage.setItem('cantidad_', this.valor_cantidad || '');
           const datos_paramm = {
            id_: id,
            cantidad_: this.valor_cantidad
           };
          
           this.registrar_fotos_y_comentarios(id,1,2);
        }else{
           event.target.checked= false;
           this.util.errorToast(this.util.translate('La cantidad Actual excede a la Cantidad Total Actualmente !!!'), 'danger');
        }

      }



    }else{
        
          $('#'+id).val(0);
           this.util.lotes_auxiliar_v3= this.util.lotes_auxiliar_v3.filter(an => an.id_ != id);
           localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
           this.util.lotes_auxiliar_v1 = this.util.lotes_auxiliar_v1.filter(x => x != id);
           console.log('fff22_80 '+JSON.stringify(this.util.lotes_auxiliar_v3));
    }
  }





  async registrar_fotos_y_comentarios(IdItem: any, posi:any, vista:any ) {
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




  selected() {
    console.log('fff15 '+JSON.stringify(this.util.lotes_auxiliar_v3));
    this.util.lotes_auxiliar_v3.forEach((element) => {
      element.cantidad_=  $('#'+element.id_).val()?.toString();
      this.Lotes1= this.Lotes.filter(an => an.Id == element.id_ );
      this.Lotes_relleno= this.Lotes1.concat(this.Lotes_relleno);
      this.Lotes_relleno[0].Cantidad_Envio = $('#'+element.id_).val()?.toString();
     });
     localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
     console.log('fff15 '+JSON.stringify(this.Lotes_relleno));
     
   
     this.util.navigateRoot('boleta');


  }










}

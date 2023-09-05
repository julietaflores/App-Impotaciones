import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, IonInput,} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { detalle_re } from 'src/app/interfaces/detalle_re';
import * as $ from 'jquery';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UtilRootParam } from 'src/app/services/util_root.param';
import { datos_param } from 'src/app/interfaces/datos_param';
import { JsonPipe } from '@angular/common';


import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { datos_lotess } from 'src/app/interfaces/datos_lotess';
// import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx";

@Component({
  selector: 'app-lista-mercancia-eg1',
  templateUrl: './lista-mercancia-eg1.page.html',
  styleUrls: ['./lista-mercancia-eg1.page.scss'],
})
export class ListaMercanciaEg1Page implements OnInit {

  campo_buscar:any='';
  valor_busqueda: any = '';
  inputModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;




  inter:any=0;
  t_limit:any;
  tamanio_lote_inicio:any=localStorage.getItem('descripcion_5');
  tamanio_lote_fin:any=localStorage.getItem('descripcion_4');
  extension: any=localStorage.getItem('extension_item');
  datos_lote:  datos_lotess = {id_:'', disnumber_:'', peso_:''};

  num_cant: any= '';
  num: any= '';
  validar_dfd:any='0';
  pesoo_volver:any='';
  pesoo_cp_cn:any='';
  pesoo_cp_resta:any='';

  pesoo:any='';
  valor_cantidad:string | undefined = '';

  pesoo_LOTE:any='';  
  pesoo_cant_LOTE:any='';
  t_limit_aux:any=1;


  detalle_detalle:any='';

 
  datos_param:  datos_param = {id_:'', docentry_: '',linenum_:'', cantidad_: '', peso_actual:'', peso_cant:'' , 
  campo1:'',campo2:'',campo3:'',campo4:'',campo5:'',campo6:'',campo7:'',campo8:'',campo9:'', campo10:'',campo11:'',campo12:''};




  rr:any='';
  cantidad_actual: any= 0;
  cantidad_registrada: any=0;
  calculoo:any='';
  limit: any=1;
  datos_paramm:any='';
  contadorr:any=0;
  le_aux:any=0;
  saveLotes: any[] = [];
  saveLotes__: any[] = [];
  savedLotesId: any[] = [];
  savedLotesIdd: any[] = [];
  Lotes: any[] = [];
  Lotes_relleno: any[] = [];
  Lotes1__: any='';
  Lotes2: any[] = [];
  copy_lote: any[] = [];
 

  detalle_re:   detalle_re = { id_detalle: '', cantidad: '' };
  Lotess1:  any='';
  dummy: any[] = [];
  Lotess1_auxx:  any='';
  Lotess1_auxx1:  any[] = [];
  Lotess11: any[] = [];

  code:any='';
  validar_con:any=0;
  Lotess1_f:  any='';
  Lotess11_f: any[] = [];

  Lotess22: any[] = [];
  cantidad_pendiente_l: any= '';
  cantidad_pendiente_num_l: any= 0;

  cantidad_pendiente_d: any= '';
  cantidad_pendiente_num_d: any= 0;



  constructor(private modalController: ModalController,
    public api: ApiService,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    public util: UtilService,
    public barcodeScanner: BarcodeScanner 
    ) 
    {  

       
      this.route.queryParams.subscribe((data_param: any) => {
        if (data_param && data_param.id_lote_ubi ) {

           if(data_param.id_lote_ubi==0){
            this.campo_buscar= "";
            localStorage.setItem("campo_buscar_item",this.campo_buscar);
            this.valor_busqueda= this.campo_buscar;
            console.log('json  existe parametro  campo buscar !!!' +this.campo_buscar);
           }else{
            this.campo_buscar= localStorage.getItem("campo_buscar_item") || "";
            this.valor_busqueda= this.campo_buscar;
            console.log('json  existe parametro  campo buscar !!!' +this.campo_buscar);
           }


          
          this.Lotes=[];
          this.limit=1;
          console.log('json  existe parametro !!!' +data_param.id_lote_ubi);
          console.log('json   extension !!!' +this.extension);
          this.dummy = Array(10);
          console.log('json  localstore 1 items '+JSON.stringify(localStorage.getItem("id_lotesss")));
          this.util.lotes_auxiliar_v3 = JSON.parse(localStorage.getItem("id_lotesss") || "[]");
          if(this.util.lotes_auxiliar_v3.length>0){
           console.log('json  items 1 '+JSON.stringify(this.util.lotes_auxiliar_v3));
          }
          this.getmercancia_registradaa();
        }
      });



       



    }

    onInpu(ev:any) {
      const value = ev.target!.value;
      const filteredValue = value.replace(/[^a-zA-Z0-9-]+/g, '');
      console.log('json  existe 0 0 0 '+filteredValue);
      this.ionInputEl.value = this.inputModel = filteredValue.toUpperCase();
    }

 

  ngOnInit() {
  }


  onSearchChange(event:any) {
    this.campo_buscar= event.detail.value;
    localStorage.setItem("campo_buscar_item",this.campo_buscar);
    this.Lotes = this.copy_lote.filter((ele: any) => {
      return ele.Proyecto.toLowerCase().includes(event.detail.value.toLowerCase());
    });
  }

  doRefreshh(event:any) {
    setTimeout(() => {
      console.log('Done');
      this.getmercancia_registradaa();
      event.target.complete();
    }, 500);
  }


  getmercancia_registradaa() {

  
      this.t_limit=this.limit * this.extension;
      this.inter= this.limit-1;
      this.inter=this.inter*this.extension;
      this.api.get_public_parametro('listar_estacion_guaracachi_docentry_total', { "limit":  this.t_limit , "extension" : this.extension}).then((data: any) => {
  
        if(data=='error'){
          this.limit=this.t_limit_aux;
          console.log('log limit error '+this.t_limit_aux);
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
        }else{


          this.limit = this.limit + 1;
          console.log('log limit '+this.limit);
          this.t_limit_aux=this.limit;
          console.log('log limit aux'+this.t_limit_aux);
          console.log('log limit aux BUSCADOR '+this.campo_buscar);


             this.copy_lote=[];
             this.dummy = [];
             data.forEach((element__: any, indexx:any) => {

              console.log('json  items 1 '+element__.Id);
              this.util.lotes_auxiliar=[];
              this.util.lotes_auxiliar_v3.forEach(o => {
                if (o.id_ === element__.Id) {
                  this.util.lotes_auxiliar.push(o);
                }
              });
            
             console.log('json items 1 '+JSON.stringify(this.util.lotes_auxiliar));
       
              if(this.util.lotes_auxiliar.length>0){
                element__.cambio=1;
                element__.Peso_Actual_control=this.util.lotes_auxiliar[0]['peso_cant'];
              }else{
                element__.cambio=0;
              }

              element__.cont= this.inter+(indexx+1);
              this.cantidad_pendiente_l= parseFloat(element__.CantidadPendiente);
              element__.CantidadPendiente = this.cantidad_pendiente_l.toLocaleString('es-MX'); // 12,000



              this.Lotes.push(element__);


            });
            this.copy_lote=this.Lotes;


            if(this.campo_buscar!=''){
              console.log('log limit aux BUSCADOR RR'+this.campo_buscar);
              this.Lotes = this.copy_lote.filter((ele: any) => {
                return ele.Proyecto.toLowerCase().includes(this.campo_buscar.toLowerCase());
              });  
            }


          
        }
      });
    
  }




















  openScanner_v1( id:any,cont:any,DocEntryy:any, LineNum:any){

     this.barcodeScanner.scan().then(barcodeData => {
     this.code= barcodeData.text;
     this.code=this.code.substr(this.tamanio_lote_inicio,this.tamanio_lote_fin);


      // this.code='D107613001';
      // alert(this.code);

      // if(this.code!='' && this.code.length==this.tamanio_lote_fin){
      //    const datos_lotes1 = {
      //     id_: id,
      //     disnumber_: this.code
      //    };    
      //    this.datos_lote= datos_lotes1;
      //    this.util.lotes_auxiliar_codigo_barra.push(this.datos_lote);
      // }
    
      
      
 
      }).catch(err => {
       console.log('Error', err);
      });


  }














 async preguntar_tipo_de_seleccion(id:any,  Proyecto:any,  ValidarLotes:any, DocEntryy:any, Itemcode:any, AB:any, LineNum:any, Unidad:any, cont:any){
      const actionSheet = await this.actionSheetController.create({

        
        header: this.util.translate('Choose Action'),
        mode: 'ios',
        buttons: [
          
          
        //   {
        //   text: this.util.translate("Buscar Lote por Código de Barra"),
        //   role: 'destructive',
        //   icon: 'search-outline',
        //   handler: () => {
        //     this.openScanner_v1(id,cont,DocEntryy,LineNum);
           
        //   }
        // },
        
        {
          text: this.util.translate("Ir a Lista de Lotes"),
          role: 'destructive',
          icon: 'search-outline',
          handler: () => {
  
            
                const paramm: NavigationExtras = {
                queryParams: {
                "cont": cont,
                "proyecto": Proyecto,
                "Id": id,
                "Docentry": DocEntryy,
                "Linenum":LineNum,
                "Itemcode" :Itemcode,
                  }
                };
                this.util.navigateToPage('lista-lotes-item', paramm);
           

          }
        },
        
        
        {
          text: this.util.translate('Cancel'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      
      
      
      ]
      });
      await actionSheet.present();


}




preguntar_tipo_de_seleccionn(id:any,  Proyecto:any, ValidarLotes:any, DocEntryy:any, Itemcode:any, AB:any, LineNum:any, Unidad:any, cont:any){
 this.util.show(this.util.translate('Cargando Información..'));
  this.api.get_public_parametro('validar_docentry_lote', { "DocEntry": DocEntryy,"LineNum" : LineNum}).then((data_dff: any) => {
    this.util.hidee();

     console.log('validacion lote '+data_dff);

  if(data_dff=='error'){
   this.util.errorToast(this.util.translate('No internet connection'), 'danger');
  }else{
   if(data_dff==1){
    this.util.errorToast(this.util.translate('Se actualizo la información y se verifico que no hay Lotes Disponibles !!!'), 'danger');
    this.limit=1;
    this.Lotes=[];
    this.getmercancia_registradaa();
   }else{
     this.preguntar_tipo_de_seleccion(id, Proyecto,ValidarLotes, DocEntryy, Itemcode, AB, LineNum, Unidad, cont);
   }
       
  }
});
}




  onInput(event:any,id:any,Unidad:any,cont:any,DocEntryy:any,LineNum:any, ig:any){
   event.target.value = event.target.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');

   console.log('json  items 1 '+'---------------');
   console.log('json  items 1 '+id);
   console.log('json  items 1 '+'---------------');

      if(event.target.value[0] == "0") {

        this.util.lotes_auxiliar_v3= this.util.lotes_auxiliar_v3.filter(an => an.id_ != id);
        console.log('json  items 99 '+JSON.stringify(this.util.lotes_auxiliar_v3));
        localStorage.removeItem('id_lotesss');
        localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
        this.Lotes[ig]['cambio']=0;
        this.Lotes[ig]['Peso_Actual_control']= 0;

        event.target.value = event.target.value.replace(/^0+/, '');



      }
      if($('#'+id).val()!=''){
       
      
              this.cantidad_actual= 0;
              this.cantidad_registrada= 0;
              this.cantidad_actual= $('#'+id).val();
              console.log('json  items 1 0 '+this.cantidad_actual);
              this.cantidad_actual= this.cantidad_actual.replace(/,/g, '');
              console.log('json  items 1 1 '+this.cantidad_actual);
              this.cantidad_registrada= this.Lotes[ig]['CantidadPendiente'];
              console.log('json  items 1 2 '+this.cantidad_registrada);
              this.cantidad_registrada= this.cantidad_registrada.replace(/,/g, '');
              console.log('json  items 1 3 '+this.cantidad_registrada);

              var uno=parseFloat(this.cantidad_actual);
              var dos=parseFloat(this.cantidad_registrada);
              this.rr= (dos-uno);
              this.calculoo= parseFloat(this.rr);
              if(this.calculoo>=0){
      
               this.util.lotes_auxiliar_v3= this.util.lotes_auxiliar_v3.filter(an => an.id_ != id);
               console.log('json  items 99 '+JSON.stringify(this.util.lotes_auxiliar_v3));
               localStorage.removeItem('id_lotesss');
               localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
      
                this.valor_cantidad= $('#'+id).val()?.toString();  
                console.log('json  items 1 4 '+this.valor_cantidad);
                console.log('json  items 1 5 '+Unidad);
                console.log('json  items 1 5 '+parseFloat(Unidad));
                this.pesoo= this.valor_cantidad;
                this.pesoo=  this.pesoo *  parseFloat(Unidad);
              
      
      
                this.valor_cantidad=this.pesoo.toLocaleString('es-MX'); // 12,000
                this.pesoo= this.valor_cantidad;
                this.pesoo = this.pesoo.replace(/,/g, '');
         
      
      
      
                this.pesoo_volver=  this.pesoo /  parseFloat(Unidad);
                this.pesoo_volver = this.pesoo_volver.toLocaleString('es-MX'); // 12,000
                this.pesoo_volver = this.pesoo_volver.replace(/,/g, '');
      
                this.pesoo_cp_cn= parseFloat(this.Lotes[ig]['CantidadPendiente']).toLocaleString('es-MX');
                this.pesoo_cp_cn= this.pesoo_cp_cn.replace(/,/g, '');
      
                this.pesoo_cp_resta= this.pesoo_cp_cn-this.pesoo_volver;
                
              //  this.pesoo_cp_resta= this.pesoo_cp_cn-this.pesoo_cp_cn;
                this.pesoo_cp_resta= parseFloat(this.pesoo_cp_resta).toLocaleString('es-MX'), // 12,000
                this.pesoo_cp_resta= this.pesoo_cp_resta.replace(/,/g, '');
      
      
                const datos_paramm = {
                  id_: id,
                  docentry_: DocEntryy,
                  linenum_:LineNum,
                  cantidad_: this.valor_cantidad,
                  peso_actual:this.pesoo,
                  peso_cant:this.valor_cantidad|| '',
      
                  campo1:this.Lotes[ig]['cont'].toString(),
                  campo2:this.Lotes[ig]['Proyecto'],
                  campo3:this.Lotes[ig]['U_IM_NumeroDUI'],
                  campo4:this.Lotes[ig]['DocNum'],
                  campo5:this.Lotes[ig]['ItemCode'],
                  campo6:this.Lotes[ig]['Descripcion'],
                  campo7:parseFloat(this.Lotes[ig]['CantidadPendiente']).toLocaleString('es-MX'),
                  campo8:this.Lotes[ig]['SalUnit'],
                  campo9:this.Lotes[ig]['AB'],
                  campo10:this.pesoo_volver,
                  campo11:this.pesoo_cp_cn,
                  campo12:this.pesoo_cp_resta
      
                };    
                this.datos_param= datos_paramm;
               this.util.lotes_auxiliar_v3.push(this.datos_param);
               localStorage.removeItem('id_lotesss');
               localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
               console.log('json  items 99 '+JSON.stringify(this.util.lotes_auxiliar_v3));
               this.Lotes[ig]['cambio']=1;
               this.Lotes[ig]['Peso_Actual_control']= this.valor_cantidad;
             //  this.registrar_fotos_y_comentarios(id,1,2);
      
      
              }else{
                 event.target.checked= false;
                 $('#'+id).val('');
                 this.util.errorToast(this.util.translate('La cantidad Actual excede a la Cantidad Total Actualmente !!!'), 'danger');
              }


        

    
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

    if(this.campo_buscar==''){

      console.log('json  boleta '+JSON.stringify(this.util.lotes_auxiliar_v3));
      console.log('json  boleta codigo de barra '+JSON.stringify(this.util.lotes_auxiliar_codigo_barra));
      this.util.lotes_auxiliar_v3 = this.util.lotes_auxiliar_v3.sort((a, b) => (a.campo1 > b.campo1) ? -1 : 1);
      console.log('json  boleta order '+JSON.stringify(this.util.lotes_auxiliar_v3));
      this.util.total_envio=0;
      if(this.util.lotes_auxiliar_v3.length>0){
        this.util.lotes_auxiliar_v3.forEach(oo => {
          this.util.total_envio=this.util.total_envio+parseFloat(oo.peso_actual);
        });
        this.util.total_envio = this.util.total_envio.toLocaleString('es-MX'); // 12,000
        this.util.total_envio_variable =  this.util.total_envio.replace(/,/g, '');
     }
      this.util.navigateRoot('boleta');


    }else{

      this.campo_buscar= '';
      this.Lotes = this.copy_lote.filter((ele: any) => {
        return ele.Proyecto.toLowerCase().includes(this.campo_buscar.toLowerCase());
      });
      this.selected();
    }



  }





 



}

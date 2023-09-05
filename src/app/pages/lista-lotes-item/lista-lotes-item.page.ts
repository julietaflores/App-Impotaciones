import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, IonInput } from '@ionic/angular';
import { argThresholdOpts } from 'moment';
import { ModalController,AlertController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
// import { ignoreElements } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ListaEstadosFacturaPage } from '../lista-estados-factura/lista-estados-factura.page';
import { NavigationExtras } from '@angular/router';
import { UtilRootParam } from 'src/app/services/util_root.param';
import { datos_lote } from 'src/app/interfaces/datos_lote';
import { datos_param } from 'src/app/interfaces/datos_param';
import { datos_lotess } from 'src/app/interfaces/datos_lotess';
@Component({
  selector: 'app-lista-lotes-item',
  templateUrl: './lista-lotes-item.page.html',
  styleUrls: ['./lista-lotes-item.page.scss'],
})
export class ListaLotesItemPage implements OnInit {
  campo_buscar:any='';
  datos_lotee:  datos_lote = { itemcode: '', DISTNUMBER: '', peso:''};

  inputModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;





  datos_param:  datos_param = {id_:'', docentry_: '',linenum_:'', cantidad_: '', peso_actual:'', peso_cant:'' , 
  campo1:'',campo2:'',campo3:'',campo4:'',campo5:'',campo6:'',campo7:'',campo8:'',campo9:'', campo10:'',campo11:'',campo12:''};



  datos_lote:  datos_lotess = {id_:'', disnumber_:'', peso_:''};
  num: any= '';
  detalle_detalle:any='';
  num_cant: any= '';
  LineNum: any='';
  docentry: any ='';
  Id:any='';
  pesoo:any='';  
  pesoo_lote:any='';  
  pesoo_cant:any='';
  pesoo_volver:any='';
  pesoo_cp_cn:any='';
  pesoo_cp_resta:any='';
  lista_disnumbr:any='';
  Itemcode     : any ='';
  AB     : any ='';
  apiCalled: boolean = false;

  Lotess1:  any='';
  Lotess1_aux:  any='';
  Lotess2:  any='';
  cont_item :any='';
  proyecto_item:any='';
  datos_paramm:any='';
  Lotess11: any[] = [];
  Lotess22: any[] = [];




  //lista de lotes
  Lista_lotes: any[] = [];
  dummylotes: any[] = [];

  constructor( 
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute,
    public urilparam: UtilRootParam,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController
    ) 
    {

      this.route.queryParams.subscribe((data: any) => {
        if (data &&  data.cont && data.proyecto && data.Id  && data.Docentry &&  data.Linenum && data.Itemcode) {
         this.Id= data.Id;
         this.docentry= data.Docentry;   
         this.LineNum= data.Linenum;
         this.Itemcode= data.Itemcode;
         this.cont_item= data.cont;
         this.proyecto_item= data.proyecto;


         this.util.dtos_lotes_v3=[];
         this.util.dtos_lotes_v1=[];

         this.util.lotes_auxiliar_v3 = JSON.parse(localStorage.getItem("id_lotesss") || "[]");
         if(this.util.lotes_auxiliar_v3.length>0){
          this.util.lotes_auxiliar_v3= this.util.lotes_auxiliar_v3.filter(an => an.id_ != this.Id);
          console.log('json cambio general'+JSON.stringify(this.util.lotes_auxiliar_v3));
         }
       
         this.util.lotes_auxiliar_v1 =JSON.parse(localStorage.getItem("datos_lotes") || "[]");
         console.log('json cambio '+JSON.stringify(this.util.lotes_auxiliar_v1));


         if(this.util.lotes_auxiliar_v1.length>0){
          console.log('json cambio '+'mayor a cero');
          console.log('json cambio '+this.Id);

         this.util.lotes_auxiliar_v1.forEach(o => {
            if (o.id_ === this.Id) {
              this.util.dtos_lotes_v3.push(o);
            }
         });

          console.log('json cambio l_v3'+JSON.stringify(this.util.dtos_lotes_v3));
          this.util.lotes_auxiliar_v1= this.util.lotes_auxiliar_v1.filter(an => an.id_ != this.Id);
          console.log('json cambio a_v1'+JSON.stringify(this.util.lotes_auxiliar_v1));

         }else{
          console.log('json cambio '+'menor a cero');
          console.log('json cambio '+JSON.stringify(this.util.lotes_auxiliar_v1));
         }

         this.AB=localStorage.getItem('descripcion_2');
         this.get_lista_de_lotes();
        }
      });

    }




  


  get_lista_de_lotes() {
    this.apiCalled = false;
    this.api.get_public_parametro('Lista_lotes__', { "DocEntry": this.docentry,"LineNum" : this.LineNum}).then((data_df: any) => {
       if(data_df=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
       }else{
       
        this.apiCalled = true;
        this.Lista_lotes=[];
        this.dummylotes=[];
        this.Lotess1=[];
        this.Lotess11=[];
        this.Lotess2=[];

      if(data_df.length>0){
        data_df.forEach((element:any, index:any) => { 

          this.num= (element.Quantity) * (element.SWeight1);
          element.totall=this.num;
          this.num = this.num.toLocaleString('es-MX'); // 12,000
          element.total=this.num;



          this.num_cant=(element.Quantity) * (element.SWeight1) / (element.SWeight1);
          element.totall_cant=this.num_cant;
          this.num_cant= this.num_cant.toLocaleString('es-MX'); // 12,000
          element.total_cant=this.num_cant;


          this.Lista_lotes.push(element);
          this.dummylotes.push(element);


        });  

          if(this.util.dtos_lotes_v3.length>0){
            this.util.dtos_lotes_v3.forEach((eleme3:any, indexx3:any) => {
              console.log('json cambio '+eleme3.disnumber_);
              this.util.dtos_lotes_v1.push(eleme3.disnumber_);    
            });
          }


      }else{
        this.util.errorToast(this.util.translate('No hay datos'), 'danger');
      }
       }
    });
  }




  onInpu(ev:any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    console.log('json  existe 0 0 0 0 '+filteredValue);
    console.log('json  existe 0 0 0 0 '+filteredValue.toUpperCase());
    this.ionInputEl.value=filteredValue.toUpperCase()||'';
 
  }
  




  onSearchChange(event:any) {
    this.campo_buscar= event.detail.value;
    this.Lista_lotes = this.dummylotes.filter((ele: any) => {
      return ele.DISTNUMBER.toLowerCase().includes(event.detail.value.toLowerCase());
    });
  }


  ngOnInit() {
  }




  checkChangee(event:any, DISTNUMBER:any, total:any, total_cant:any) {
   const valopy = event.detail.checked;
   if(valopy == true) {
    this.util.dtos_lotes_v1.push(DISTNUMBER);    
     this.registrar_fotos_y_comentarios(this.Id, this.docentry,this.LineNum,this.Itemcode,DISTNUMBER,1,2);
   }else{
     this.util.dtos_lotes_v1 = this.util.dtos_lotes_v1.filter(x => x != DISTNUMBER);
   }
 }



  selected() {
    if(this.campo_buscar==''){
  

       this.pesoo=0;
       this.pesoo_cant=0;
       localStorage.removeItem('id_lotesss');
       localStorage.removeItem('datos_lotes');
       localStorage.setItem("datos_lotes", JSON.stringify( this.util.lotes_auxiliar_v1));



       if(this.util.dtos_lotes_v1.length>0){
        console.log('json cambio selected '+'mayor a ceroo ');

        this.util.dtos_lotes_v1.forEach((elementrg:any, indexxg:any) => {
       
           this.Lotess1_aux= this.Lista_lotes.filter(an => an.DISTNUMBER == elementrg);
            this.Lotess1_aux.forEach((eleml:any, indexl:any) => {

              this.pesoo_lote= eleml.totall;
              console.log('json cambio 1000 selected '+this.pesoo_lote);
              this.pesoo= this.pesoo+ eleml.totall;
            });

             const datos_lotes1 = {
              id_: this.Id,
              disnumber_: elementrg||'',
              peso_:this.pesoo_lote||''
             };    
             this.datos_lote= datos_lotes1;
             this.util.lotes_auxiliar_v1.push(this.datos_lote);
        });

        localStorage.removeItem('datos_lotes');
        localStorage.setItem("datos_lotes", JSON.stringify(this.util.lotes_auxiliar_v1));
        console.log('json cambio items 1 lotes selected '+JSON.stringify(this.util.lotes_auxiliar_v1));
        console.log('json cambio peso selected '+this.pesoo);
        this.pesoo_cant = this.pesoo.toLocaleString('es-MX'); // 12,000
        this.pesoo = this.pesoo_cant;
        this.pesoo = this.pesoo.replace(/,/g, '');
        

        this.api.get_public_parametro('listar_estacion_guaracachi_docentry_total_x_item', { "Id": this.Id }).then((data_item: any) => {
           if(data_item.length>0){
            console.log('json cambio items 1 selected '+JSON.stringify(data_item));
            data_item.forEach((elementg__: any, indexxg:any) => {



              this.pesoo_volver=  this.pesoo /  parseFloat(elementg__.Unidad);
              this.pesoo_volver = this.pesoo_volver.toLocaleString('es-MX'); // 12,000
              this.pesoo_volver = this.pesoo_volver.replace(/,/g, '');
               

              this.pesoo_cp_cn= parseFloat(elementg__.CantidadPendiente).toLocaleString('es-MX'), // 12,000
              this.pesoo_cp_cn= this.pesoo_cp_cn.replace(/,/g, '');

              this.pesoo_cp_resta= this.pesoo_cp_cn-this.pesoo_volver;
              this.pesoo_cp_resta= parseFloat(this.pesoo_cp_resta).toLocaleString('es-MX'), // 12,000
              this.pesoo_cp_resta= this.pesoo_cp_resta.replace(/,/g, '');



              this.datos_paramm = {
                id_: this.Id,
                docentry_: this.docentry,
                linenum_:this.LineNum,
                cantidad_: this.pesoo_cant,
                peso_actual:this.pesoo,
                peso_cant:this.pesoo_cant,
      
      
                campo1:this.cont_item,
                campo2:this.proyecto_item,
                campo3:elementg__.U_IM_NumeroDUI,
                campo4:elementg__.DocNum,
                campo5:this.Itemcode,
                campo6:elementg__.Descripcion,
                campo7:parseFloat(elementg__.CantidadPendiente).toLocaleString('es-MX'), // 12,000
                campo8:elementg__.SalUnit,
                campo9:elementg__.AB,
                campo10:this.pesoo_volver,
                campo11:this.pesoo_cp_cn,
                campo12:this.pesoo_cp_resta



               };    

            });


            this.datos_param= this.datos_paramm;
            console.log('json cambio relleno selected '+JSON.stringify(this.datos_param));
            this.util.lotes_auxiliar_v3.push(this.datos_param);

            console.log('json cambio general dentro selected '+JSON.stringify(this.util.lotes_auxiliar_v3));
 

            this.util.dtos_lotes_v3=[];
            this.util.dtos_lotes_v1=[];
    
            localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));
          

            const paramm: NavigationExtras = {
              queryParams: {  "id_lote_ubi": this.Id}
            };
             this.util.navigateToPage('lista-mercancia-eg1', paramm);

           }
        });





   
       }else{

        console.log('json cambio general dentro'+JSON.stringify(this.util.lotes_auxiliar_v3));
 
        this.util.dtos_lotes_v3=[];
        this.util.dtos_lotes_v1=[];

        localStorage.setItem("id_lotesss", JSON.stringify(this.util.lotes_auxiliar_v3));


        const paramm: NavigationExtras = {
          queryParams: {  "id_lote_ubi": this.Id}
        };
         this.util.navigateToPage('lista-mercancia-eg1', paramm);

       }

       



    }else{
      this.campo_buscar='';
      this.Lista_lotes = this.dummylotes.filter((ele: any) => {
        return ele.DISTNUMBER.toLowerCase().includes(this.campo_buscar.toLowerCase());
      });
      this.selected();
    }
   
  }



  
  async registrar_fotos_y_comentarios(id_:any, docentry_:any, linenum_:any, itemcode_:any,DISTNUMBER:any,posi:any, vista:any ) {
    if(posi==1){
        this.detalle_detalle="Registrar Fotos del Lote";
    }else{
        this.detalle_detalle="Listar Fotos del Lote";
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
              "id_": id_,
              "docentry_": docentry_,
              "linenum_":linenum_,
              "itemcode_":itemcode_,
              "Disnumber":DISTNUMBER,
              "posi":posi,
              "vista":vista
           
            }
          };
       
          this.util.navigateToPage('registro-imagen-y-comentario-lote', param);  
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

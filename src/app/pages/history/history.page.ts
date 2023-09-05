import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  dummy: any[] = [];
  oldOrders: any[] = [];
  limit: any=1;
  addressTitle: any = '';
  contadorr:any=0;
  extension: any=8;
  le_aux:any=0;
  constructor(
    public util: UtilService,
    public api: ApiService
  ) {
    this.util.retriveChanges().subscribe(() => {
      this.dummy = Array(15);
      this.getOrders('', false);
    })
  }

  ionViewWillEnter() {
    this.limit = 1;
    this.dummy = Array(10);
    this.getOrders('', false);
  }



  doRefresh(event:any) {
    console.log(event);
    this.limit = this.limit + 1;
    this.getOrders(event, true);
  }


  getOrders(event:any, haveRefresh:any) {
    console.log('evento '+event);
    console.log('have '+haveRefresh);
    this.le_aux= this.limit*this.extension;
    this.api.get_public_parametro('listar_notificacion_x_usuario',{"usuario": localStorage.getItem('user_sap'), "limit": this.le_aux } ).then((data: any) => {

      
      console.log('datos bu '+this.contadorr);
      if(data=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        
        console.log('datos bu '+this.contadorr);
        this.contadorr=0;
        this.dummy = [];
        this.oldOrders = [];
  
          data.forEach( (element: any) => {
            this.contadorr=this.contadorr+1;
            element.FechaRegistro = moment(element.FechaRegistro).format('llll');
            this.oldOrders.push(element);
          });

          console.log('datos bu '+this.contadorr);
          console.log('datos bu '+this.le_aux);
          console.log('datos bu '+haveRefresh);
          
          event.target.complete();
  
          if (this.contadorr<this.le_aux ) {
            event.target.disabled = true;
          }
   
      }
    });
  }




  ngOnInit() {
    console.log('idioma home1 '+localStorage.getItem('selectedLanguage'));
    moment.locale(localStorage.getItem('selectedLanguage') || 'es');
    this.addressTitle = localStorage.getItem('user_sap');
    console.log('idioma cantidad histori'+localStorage.getItem('cantidad_notificacion'));
  }

}

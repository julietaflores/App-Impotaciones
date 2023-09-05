import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-store-ticketbalanza',
  templateUrl: './store-ticketbalanza.page.html',
  styleUrls: ['./store-ticketbalanza.page.scss'],
})

export class StoreTicketbalanzaPage implements OnInit {



  valor_busqueda: any = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  saveListaTicketBalanza: any[] = [];
  savedListaTicketBalanzaId: any[] = [];
  apiCalled: boolean = false;
  Lista_TicketBalanza: any[] = [];
  Lista_TicketBalanza_AUX: any[] = [];
  dummyCate: any[] = [];
  savedLista:string="";
  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    public api: ApiService,
    public util: UtilService
  ) 
  {  
    this.saveListaTicketBalanza = this.navParam.get('lista_ticket_balanza');
    this.getlista_ticket();
  }


    getlista_ticket() {

    this.apiCalled = false;
    this.api.get_public('ListaTicketBalanza').then((data: any) => {
    
      if(data=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        this.Lista_TicketBalanza = [];
        this.dummyCate= [];
        this.apiCalled = true;
        
        if(data.length>0){

          this.Lista_TicketBalanza_AUX = data;
    

          this.Lista_TicketBalanza_AUX.forEach((elementrg:any, indexxg:any) => {
            console.log('datos info___ '+elementrg.U_Fecha); 
            elementrg.U_Fecha =moment(elementrg.U_Fecha).format('LL');
             this.Lista_TicketBalanza.push(elementrg);
             this.dummyCate.push(elementrg);
          });
          this.Lista_TicketBalanza_AUX = [];

          this.savedLista = this.saveListaTicketBalanza.map(item => item.U_NroTicket).toString();
          console.log('fff00_ '+this.savedLista);
        }
       
      }

    });


  }


  onInpu(ev:any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9-]+/g, '');
    console.log('json  existe 0 0 0 0 '+filteredValue);
    console.log('json  existe 0 0 0 0 '+filteredValue.toUpperCase());
    this.ionInputEl.value=filteredValue.toUpperCase()||'';
 
  }
  
  changed(event:any) {
    console.log('fff1_ '+event.detail.value);
     const selected = this.Lista_TicketBalanza.filter(x => x.U_NroTicket == event.detail.value);
     console.log('fff2_ '+JSON.stringify(selected));
     if (selected && selected.length > 0) {
      this.savedListaTicketBalanzaId=[];
      this.savedListaTicketBalanzaId.push(event.detail.value);
      console.log('fff3_ '+JSON.stringify(this.savedListaTicketBalanzaId));
     }
  }


  onSearchChange(event:any) {
    console.log('fff4_ '+event.detail.value);
    console.log('fff5_ '+JSON.stringify(this.dummyCate));
    this.Lista_TicketBalanza = this.dummyCate.filter((ele: any) => {return ele.U_Placa.toLowerCase().includes(event.detail.value.toLowerCase()); });
    console.log('fff6_ '+JSON.stringify(this.Lista_TicketBalanza));
  }
  
    
    ngOnInit() {
    }
  

  
    close() {
      this.modalController.dismiss('close', 'close');
    }
  


    selected() {
      let selectedCategories: any[] = [];
      this.Lista_TicketBalanza.forEach((element) => {
        if (this.savedListaTicketBalanzaId.includes(element.U_NroTicket)) {
          selectedCategories.push(element);
        }
      });
      this.modalController.dismiss(selectedCategories, 'ok');
    }





}

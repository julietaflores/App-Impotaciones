import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-store-destino',
  templateUrl: './store-destino.page.html',
  styleUrls: ['./store-destino.page.scss'],
})
export class StoreDestinoPage implements OnInit {


  valor_busqueda: any = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  saveListaTicketdestino: any[] = [];
  savedListaTicketDestinoId: any[] = [];
  apiCalled: boolean = false;
  Lista_TicketDestino: any[] = [];
  Lista_TicketDestino_AUX: any[] = [];
  dummyCate: any[] = [];
  savedLista:string="";
  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    public api: ApiService,
    public util: UtilService
  ) 
  {  
    this.saveListaTicketdestino = this.navParam.get('lista_ticket_destino');
    this.getlista_ticket_destino();
  }


    getlista_ticket_destino() {

    this.apiCalled = false;
    this.api.get_public('ListaAlmacen_total').then((data: any) => {
    
      if(data=='error'){
        this.util.errorToast(this.util.translate('No internet connection'), 'danger');
      }else{
        this.Lista_TicketDestino = [];
        this.dummyCate= [];
        this.apiCalled = true;
        
        if(data.length>0){

          this.Lista_TicketDestino_AUX = data;
          this.Lista_TicketDestino_AUX.forEach((elementrg:any, indexxg:any) => {
             this.Lista_TicketDestino.push(elementrg);
             this.dummyCate.push(elementrg);
          });
          this.Lista_TicketDestino_AUX = [];
          this.savedLista = this.saveListaTicketdestino.map(item => item.WhsCode).toString();
        }
       
      }

    });


  }


  onInpu(ev:any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9-]+/g, '');
    this.ionInputEl.value=filteredValue.toUpperCase()||'';
  }
  
  changed(event:any) {
     const selected = this.Lista_TicketDestino.filter(x => x.WhsCode == event.detail.value);
     console.log('fff4_ '+JSON.stringify(selected));
     if (selected && selected.length > 0) {
      this.savedListaTicketDestinoId=[];
      this.savedListaTicketDestinoId.push(event.detail.value);
     }
  }


  onSearchChange(event:any) {
    this.Lista_TicketDestino = this.dummyCate.filter((ele: any) => {return ele.WhsCode.toLowerCase().includes(event.detail.value.toLowerCase()); });
  }
  
    
    ngOnInit() {
    }
  

  
    close() {
      this.modalController.dismiss('close', 'close');
    }
  


    selected() {
      let selectedDestino: any[] = [];
      this.Lista_TicketDestino.forEach((element) => {
        if (this.savedListaTicketDestinoId.includes(element.WhsCode)) {
          selectedDestino.push(element);
        }
      });
      this.modalController.dismiss(selectedDestino, 'ok');
    }


}

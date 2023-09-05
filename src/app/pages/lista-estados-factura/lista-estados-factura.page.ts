import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { detalle_re } from 'src/app/interfaces/detalle_re';
import * as $ from 'jquery';


@Component({
  selector: 'app-lista-estados-factura',
  templateUrl: './lista-estados-factura.page.html',
  styleUrls: ['./lista-estados-factura.page.scss'],
})
export class ListaEstadosFacturaPage implements OnInit {
  saveEstados_Id: any[] = [];
  savedEstados_Id: any[] = [];
  apiCalled: boolean = false;
  Lista_estados_factura: any[] = [];
  dummyCate: any[] = [];


  constructor( 
    private modalController: ModalController,
    private navParam: NavParams,
    public api: ApiService,
    public util: UtilService
    ) 
    {
    this.saveEstados_Id = this.navParam.get('lista_estado_fact');
    this.savedEstados_Id = [...new Set(this.saveEstados_Id.map(item => item.Id))];
    this.get_lista_estados_factura(); 
    }




    get_lista_estados_factura() {
      this.apiCalled = false;
      this.api.get_public('lista_estados_factura').then((data: any) => {
         this.apiCalled = true;
         if (data) {
           this.Lista_estados_factura = data;
           this.dummyCate = data;   
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
      this.Lista_estados_factura = this.dummyCate.filter((ele: any) => {
        return ele.Detalle.toLowerCase().includes(event.detail.value.toLowerCase());
      });
    }



  ngOnInit() {
  }




  checkChange(event:any, id:any) {
    console.log(event);
    if (event && event.detail && event.detail.checked == false) {
      this.savedEstados_Id = this.savedEstados_Id.filter(x => x != id);
    } else if (event && event.detail && event.detail.checked == true) {
      console.log('add it');
      this.savedEstados_Id.push(id);
    } else {
      console.log('nothing');
    }
  }

  
  close() {
    this.modalController.dismiss('close', 'close');
  }

  selected() {
    console.log(this.savedEstados_Id);
    let selected_estados: any[] = [];
    console.log('cantidad '+this.savedEstados_Id.length);

        this.Lista_estados_factura.forEach((element) => {
         if (this.savedEstados_Id.includes(element.Id)) {
          selected_estados.push(element);
         }
        });
        this.modalController.dismiss(selected_estados, 'ok');
  }



}

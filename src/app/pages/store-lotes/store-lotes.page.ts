import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-store-lotes',
  templateUrl: './store-lotes.page.html',
  styleUrls: ['./store-lotes.page.scss'],
})
export class StoreLotesPage implements OnInit {
  saveAlmacen: any[] = [];
  savedAlmacenId: any[] = [];
  apiCalled: boolean = false;
  Almacen: any[] = [];
  dummyCate: any[] = [];
  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    public api: ApiService,
    public util: UtilService
    ) {  
      this.saveAlmacen = this.navParam.get('almacen');
      this.savedAlmacenId = [...new Set(this.saveAlmacen.map(item => item.WhsCode))];
      this.getCategories();
      }

      getCategories() {
        console.log('lista_almacen');
        this.apiCalled = false;
        this.api.get_public('ListaAlmacen').then((data: any) => {
          console.log('data_almacen '+data);
           this.apiCalled = true;
           if (data) {
             this.Almacen = data;
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
        this.Almacen = this.dummyCate.filter((ele: any) => {
          return ele.WhsName.toLowerCase().includes(event.detail.value.toLowerCase());
        });
      }
    
      ngOnInit() {
      }
    


      checkChange(event:any, id:any) {
        console.log(event);
        if (event && event.detail && event.detail.checked == false) {
          console.log('remove it');
          this.savedAlmacenId = this.savedAlmacenId.filter(x => x != id);
        } else if (event && event.detail && event.detail.checked == true) {
          console.log('add it');
          this.savedAlmacenId.push(id);
        } else {
          console.log('nothing');
        }
      }
    
      close() {
        this.modalController.dismiss('close', 'close');
      }
    
      selected() {
        console.log(this.savedAlmacenId);
        let selectedCategories: any[] = [];
        this.Almacen.forEach((element) => {
          if (this.savedAlmacenId.includes(element.WhsCode)) {
            selectedCategories.push(element);
          }
        });
        this.modalController.dismiss(selectedCategories, 'ok');
      }


      
}

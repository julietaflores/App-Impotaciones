import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { UtilRootService} from 'src/app/services/util_root.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  selectedIndex: any;
  constructor(
    public utilrootservice: UtilRootService,
    public util: UtilService,
    public api: ApiService
  ) { }

  ngOnInit() {
  }



  onLanguage() {
    this.util.navigateToPage('/languages');
  }

  onContact() {
    this.util.navigateToPage('/contact-us');
  }



   
  logout() {
    this.util.show(this.util.translate('Cerrando Sesion..'));
    this.selectedIndex=0;
    const datoss= this.utilrootservice.datos_inicioo;
    console.log('datos_INICIO Logout '+ JSON.stringify(datoss));

     const datos_iniI = {
      user_sap: '',
      uid_sap: '',
      pushToken: '',
      tipo_usuario:'',
      inicio_clik:0,
      descripcion_tipo_persona:''
     };


 //Lotes 
 this.util.lotes_auxiliar_v3=[];
 this.util.lotes_auxiliar_v1=[];
 this.util.dtos_lotes_v3=[];
 this.util.dtos_lotes_v1=[];
 this.util.select_boleta_transporte=[];
 
       //lista de items


       this.util.lotes_auxiliar=[];
       this.util.validar_datos_despachador=[];


    localStorage.removeItem('user_sap');
      localStorage.removeItem('uid_sap');
      localStorage.removeItem('pushToken');
      localStorage.removeItem('tipo_usuario');


      localStorage.removeItem('tipo_usuario');

      
      localStorage.removeItem('descripcion_1');
      localStorage.removeItem('descripcion_2');
      localStorage.removeItem('descripcion_3');
      localStorage.removeItem('descripcion_4');
      localStorage.removeItem('descripcion_5');
      localStorage.removeItem('extension_item');


      localStorage.removeItem('id_lotesss');
      localStorage.removeItem('descripcion_tipo_persona');
      
      localStorage.removeItem('datos_lotes');
      localStorage.removeItem('validar_despachador');
     this.utilrootservice.datos_inicioo=datos_iniI;
     console.log('datos_INICIO Logout '+ JSON.stringify(this.utilrootservice.datos_inicioo));
     this.util.hidee();
     this.util.navigateRoot('/');
  }




  openPage(title: any, id: any) {
    console.log('valop '+title, id);
    const param: NavigationExtras = {
      queryParams: {
        "id": id,
        "title": this.util.translate(title)
      }
    };
    this.util.navigateToPage('app-pages', param);
  }




}

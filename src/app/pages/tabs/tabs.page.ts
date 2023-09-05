import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  cantidad_notifificacion:any=0;
  constructor(
    public util: UtilService,
    public api: ApiService,
  ) { }

  ngOnInit() {
    console.log('idioma home1 TAB '+localStorage.getItem('selectedLanguage'));
    console.log('idioma cantidad '+localStorage.getItem('cantidad_notificacion'));
    this.cantidad_notifificacion=localStorage.getItem('cantidad_notificacion');

    this.api.get_public_parametro('listar_notificacion_x_usuario_cantidad',{"usuario": localStorage.getItem('user_sap') } ).then((dataI: any) => {
      console.log('NOTIFICACION '+JSON.stringify(dataI));
      if(dataI=='error'){
        this.util.errorToast(this.util.translate('Sin Conexión a Internet, nose pudieron cargar correctamente las Notificaciones'), 'danger');
      }else{
        dataI.forEach((elementI:any) => {
          this.cantidad_notifificacion= elementI.cantidad; 
          console.log('NOTIFICACION TAB '+this.cantidad_notifificacion);
          localStorage.setItem('cantidad_notificacion', this.cantidad_notifificacion);
          console.log('NOTIFICACION '+localStorage.getItem('cantidad_notificacion'));
        });
      }
    });


  }

  

  calcular_cant_noti(){
    this.cantidad_notifificacion=localStorage.getItem('cantidad_notificacion');
     if(this.cantidad_notifificacion>0){
       this.api.post_public_parametro('actualizar_lognoti_user',{"usuario": localStorage.getItem('user_sap') } ).then((dataII: any) => {
        console.log('NOTIFICACION histori'+JSON.stringify(dataII));
         if(dataII=='error'){
          this.util.errorToast(this.util.translate('No internet connection'), 'danger');
         }else{
          this.api.get_public_parametro('listar_notificacion_x_usuario_cantidad',{"usuario": localStorage.getItem('user_sap') } ).then((dataIII: any) => {
                if(dataIII=='error'){
                  this.util.errorToast(this.util.translate('No internet connection'), 'danger');
                }else{
                  console.log('NOTIFICACION '+JSON.stringify(dataIII));
                  dataIII.forEach((elementII:any) => {
                     this.cantidad_notifificacion= elementII.cantidad; 
                     console.log('NOTIFICACION TAB '+this.cantidad_notifificacion);
                     localStorage.setItem('cantidad_notificacion', this.cantidad_notifificacion);
                     console.log('NOTIFICACION '+localStorage.getItem('cantidad_notificacion'));
                  });
                }
          });
         }
       });
     }
  }


}

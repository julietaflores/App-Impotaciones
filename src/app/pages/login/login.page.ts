import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { login } from 'src/app/interfaces/login';
import { datos_inicio } from 'src/app/interfaces/datos_inicio';
import { loginSAP } from 'src/app/interfaces/loginSAP';
import { Lista_Log } from 'src/app/interfaces/Lista_Log';
import { mobile } from 'src/app/interfaces/mobile';
import { mobileLogin } from 'src/app/interfaces/mobileLogin';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { SelectCountryPage } from '../select-country/select-country.page';
import { TranslateService } from '@ngx-translate/core';
import { UtilRootService} from 'src/app/services/util_root.service';
import { JsonPipe } from '@angular/common';
import { datos_param } from 'src/app/interfaces/datos_param';
import { UtilRootParam } from 'src/app/services/util_root.param';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 // datos_param:  datos_param = { id_: '', cantidad_: ''};
  public cantidad_notificacion:any=0;
  login:   login = { email: '', password: '' };
  datos_inicio:   datos_inicio = { user_sap: '', uid_sap: '', pushToken:'', tipo_usuario:'', inicio_clik: 0 , descripcion_tipo_persona:''};
  loginSAP:   loginSAP = { user: '', pase: '' };
  lista_log:   Lista_Log = { usuario: '', token_acceso: '', tokenfb:'' };
  mobileLogin: mobile = { country_code: '', mobile: '', password: '' };
  mobileOTPLogin: mobileLogin = { country_code: '', mobile: '' };
  submitted = false;
  isLogin: boolean = false;
  viewPassword: boolean = false;
  selectedLanguages: any = 'es';
  constructor(
    public urilroot: UtilRootService,
    public util: UtilService,
    public urilparam: UtilRootParam,
    public api: ApiService,
    private chMod: ChangeDetectorRef,
    private modalController: ModalController,
    private translate: TranslateService,
  ) {
    this.selectedLanguages = localStorage.getItem('selectedLanguage');
    setTimeout(() => {
      console.log(this.util.settingInfo);
      console.log('idioma '+localStorage.getItem('selectedLanguage'));
    }, 1000);
  }

  ngOnInit() {
   console.log('ingresando al login');
  }

  onRegister() {
    this.util.navigateRoot('register');
  }

  resetPassword() {
    this.util.navigateRoot('reset-password');
  }

  onSocial() {

  }

  changeType() {
    this.viewPassword = !this.viewPassword;
  }

  updateFCMToken() {
    const param = {
      id: localStorage.getItem('uid'),
      fcm_token: localStorage.getItem('pushToken') && localStorage.getItem('pushToken') != null ? localStorage.getItem('pushToken') : 'NA'
    }
    this.api.post_private('v1/profile/update', param).then((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }




   

  onLogin(form: NgForm) {
   
    this.submitted = true;
    this.chMod.detectChanges();
    if (form.valid) {

      console.log('login');
      this.isLogin = true;
    
       this.loginSAP.user= this.login.email;
       this.loginSAP.pase= this.login.password;
       console.log('user login '+this.loginSAP);
       console.log('user login '+JSON.stringify(this.loginSAP));


        this.api.post_public_importaciones('login_aa', this.loginSAP).then((data: any) => {
           this.isLogin = false;
         
           console.log('DATOS  JULI'+JSON.stringify(data));

           if(data=='error'){
            this.util.errorToast(this.util.translate('No internet connection error 1'), 'danger');
           }else{
             data.forEach((element_:any) => {
              console.log('servicio '+element_.data1);
             if(element_.data1==0){
              this.util.errorToast(this.util.translate('No internet connection error 2'), 'danger');
             }else{

                console.log('TIPO_USER_LOGIN '+element_.tipousuario);
                localStorage.setItem('tipo_usuario', element_.tipousuario);
                localStorage.setItem('descripcion_tipo_persona', element_.Descripcion);

                
                localStorage.setItem('descripcion_1', element_.descripcion_1);
                localStorage.setItem('descripcion_2', element_.descripcion_2);
                localStorage.setItem('descripcion_3', element_.descripcion_3);
                localStorage.setItem('descripcion_4', element_.descripcion_4);
                localStorage.setItem('descripcion_5', element_.descripcion_5);
                localStorage.setItem('extension_item', element_.descripcion_6);

           
                localStorage.setItem('uid_sap', element_.data1);
                localStorage.setItem('user_sap', this.loginSAP.user); 


                  this.api.get_public_parametro('listar_notificacion_x_usuario_cantidad',{"usuario": localStorage.getItem('user_sap') } ).then((dataI: any) => {

                     if(dataI=='error'){
                      this.util.errorToast(this.util.translate('No internet connection error 3'), 'danger');
                     }else{
                      console.log('NOTIFICACION '+JSON.stringify(dataI));
                      dataI.forEach((elementI:any) => {
                         this.cantidad_notificacion= elementI.cantidad; 
                         localStorage.setItem('cantidad_notificacion', this.cantidad_notificacion);
                      });

                      const datos_iniI = {
                        user_sap: this.loginSAP.user,
                        uid_sap: element_.data1,
                        pushToken: localStorage.getItem('pushToken') && localStorage.getItem('pushToken') != null ? localStorage.getItem('pushToken') : 'NA',
                        tipo_usuario:element_.tipousuario,
                        inicio_clik: 0,
                        descripcion_tipo_persona:element_.Descripcion
                      };
      
                      this.datos_inicio= datos_iniI;
                      this.urilroot.datos_inicioo= this.datos_inicio;

                      this.lista_log.usuario=this.loginSAP.user;
                      this.lista_log.token_acceso= element_.data1;
                      this.lista_log.tokenfb= localStorage.getItem('pushToken') && localStorage.getItem('pushToken') != null ? localStorage.getItem('pushToken') : 'NA';
                      console.log('MY PUSH', localStorage.getItem('pushToken'));
                      console.log(this.lista_log);





                      this.api.insert_log1('insert_log1', this.lista_log).then((data_log: any) => {
                        console.log(data_log);
                        if(data_log=='error'){
                          this.util.errorToast(this.util.translate('No internet connection error 4'), 'danger');
                        }else{
                         this.util.navigateRoot('tabs/home/1');
                         this.util.publishNewAddress();
                        }
                    
                       })



                     }

                  });


                  
             
             }
  
  
             });
  


           }
          
       
        


              
        });

  }
}














  async onCountryCode() {
    const modal = await this.modalController.create({
      component: SelectCountryPage,
      backdropDismiss: false,
      showBackdrop: true,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.role == 'selected') {
        console.log('ok');
        this.mobileLogin.country_code = '+' + data.data;
        this.mobileOTPLogin.country_code = '+' + data.data;
      }
    });
    return await modal.present();
  }

  translateApp() {
    console.log(this.selectedLanguages);
    const selected = this.util.allLanguages.filter(x => x.code == this.selectedLanguages);
    console.log(selected);
    if (selected && selected.length > 0) {
      localStorage.setItem('selectedLanguage', this.selectedLanguages);
      localStorage.setItem('direction', selected[0].direction);
      this.translate.use(localStorage.getItem('selectedLanguage') || 'es');
      document.documentElement.dir = selected[0].direction;
    }
  }
}

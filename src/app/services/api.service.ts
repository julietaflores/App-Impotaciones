import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any = '';
  servicio_importaciones: any = '';
  mediaURL: any = '';
  mediaURL1: any = '';
  mediaURL1__: any = '';
  mediaURL__: any = '';
  datos_boleta:any='';
  
  constructor(
    private http: HttpClient,
  ) 
  
  {
    this.servicio_importaciones=environment.servicio_importaciones;
    this.baseUrl =   environment.servicio_importaciones;
    this.mediaURL =  environment.mediaUrl;
    this.mediaURL1= environment.mediaUrl1;
    this.mediaURL1__=environment.mediaUrl1__;
    this.mediaURL__=environment.mediaUrl__;
    this.datos_boleta= environment.datos_boleta;
  }


  

public post_public_importaciones(url:any,body:any): Promise<any> {

  return new Promise<any>((resolve, reject) => {
   const param = this.JSON_to_URLEncoded(body);
   const vv=this.servicio_importaciones + url+'&'+param;
   console.log('DATOS  JULI'+JSON.stringify(vv));
    this.http.get(vv).subscribe((data) => {
      resolve(data);
    }, error => {
       resolve('error');
    });
  });

}

  uploadFile(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('userfile', f));
    return this.http.post(this.baseUrl + 'users/upload_image', formData);
  }

  JSON_to_URLEncoded(element:any, key?:any, list?:any) {
    let new_list = list || [];
    if (typeof element == 'object') {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }

  public post_private(url:any, body:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(this.baseUrl + url, param, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


  public post_temp(url:any, body:any, temp:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${temp}`)
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(this.baseUrl + url, param, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }







  public insert_log(url:any,body:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
     const vv= this.servicio_importaciones + url;
     const header = {
       headers: new HttpHeaders()
         .set('Content-Type', 'application/x-www-form-urlencoded')
     };
     const param = this.JSON_to_URLEncoded(body);
      this.http.post(this.servicio_importaciones + url+'&'+param,'', header).subscribe((data) => {
        resolve(data);

      }, error => {
        reject(error);
     });
    });
 }







public get_JSON(url:any,body:any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
   const vv= this.servicio_importaciones + url;
   console.log(JSON.stringify(body));
   const valo= this.servicio_importaciones+url+'&datos='+JSON.stringify(body);
   console.log('url_envio '+valo);
   this.http.get(valo).subscribe((data) => {
    resolve(data);
   }, error => {
 //   reject(error);
    resolve('error');
   });
  });
}



public insert_JSON(url:any,body:any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
   const vv= this.servicio_importaciones + url;
   console.log(JSON.stringify(body));
   const valo= this.servicio_importaciones+url+'&datos='+JSON.stringify(body);
   console.log('url_envio '+valo);
   this.http.post(valo,'').subscribe((data) => {
    resolve(data);
   }, error => {
  //  reject(error);
    resolve('error');
   });
  });
}


public insert_log1(url:any,body:any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
   const vv= this.servicio_importaciones + url;
   let Data=[];
   Data.push(body);
   JSON.stringify(Data);
   console.log(JSON.stringify(Data));
   console.log(this.servicio_importaciones+url+'&datos='+JSON.stringify(Data));
   this.http.post(this.servicio_importaciones+url+'&datos='+JSON.stringify(Data),'').subscribe((data) => {
    resolve(data);
   }, error => {
  //  reject(error); 
    resolve('error');
   });
  });
}





public insert_datos_json(url:any,body:any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
   const vv= this.servicio_importaciones + url;
   let Data=[];
   Data.push(body);
   this.http.post(this.servicio_importaciones+url+'&datos='+JSON.stringify(Data),'').subscribe((data) => {
    resolve(data);
   }, error => {
    resolve('error');
   });
  });
}









public uploadImage(url:any, blobData:any, ext:any, tipo:any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', blobData, `image.${ext}`);
    console.log('url_image '+this.baseUrl + url+'&tipo='+tipo);
    this.http.post(this.baseUrl + url+'&tipo='+tipo, formData).subscribe((data) => {
      resolve(data);
    }, error => {
      resolve('error');
    });
  });
}


public post_public_parametro(url:any, body:any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const vv= this.servicio_importaciones + url;
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const param = this.JSON_to_URLEncoded(body);
    console.log('datos_put'+this.servicio_importaciones + url+'&'+param);
     this.http.post(this.servicio_importaciones + url+'&'+param,'', header).subscribe((data) => {
       resolve(data);
      console.log('datos_put'+data);
     }, error => {
       reject(error);
    });
   });
}






  public post_public(url:any, body:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(this.baseUrl + url, param, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }







  public get_public(url:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      console.log('lista_datos '+this.baseUrl + url);
      this.http.get(this.baseUrl + url, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }






  public get_public_importaciones_sin_datos(url:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.get(this.servicio_importaciones + url, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public get_private(url:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      };
      this.http.get(this.baseUrl + url, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public externalGet(url:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.get(url, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


  public get_public_parametro(url:any, body:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const param = this.JSON_to_URLEncoded(body);
      const url_completo=this.baseUrl + url+'&'+param;
      console.log('URL PETICION '+this.baseUrl + url+'&'+param);
      this.http.get(url_completo, header).subscribe((data) => {
        resolve(data);
      }, error => {
        resolve('error');
      });
    });
  }

  httpGet(url:any, key:any) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${key}`)
    };
    return this.http.get(url, header);
  }

  public getLocalAssets(name:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.get('assets/jsons/' + name, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}

import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-app-pages',
  templateUrl: './app-pages.page.html',
  styleUrls: ['./app-pages.page.scss'],
})
export class AppPagesPage implements OnInit {
  title: any = '';
  id: any = '';
  content: any = '';
  apiCalled: boolean = false;
  constructor(
    public util: UtilService,
    public api: ApiService,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      if (data && data.title && data.id) {
        this.id = data.id;
        this.title = data.title;
        this.getContent();
      }
    });
  }

  getContent() {
    this.apiCalled = false;
    this.api.get_public_parametro('lista_mas_opciones', { "id": this.id }).then((data: any) => {
      console.log(data);
      this.apiCalled = true;
      if (data) {
        const info = data;
        console.log('campo '+info);
        console.log('campo '+JSON.stringify(info));
        data.forEach((element_:any) => {
          this.content = element_.Detalle;
          console.log('campo '+this.content);
        });
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


  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }
}

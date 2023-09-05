import { Component, OnInit , Input, ViewChild} from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';
import { ModalController } from '@ionic/angular';
import SwiperCore , {Zoom} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Zoom])


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  
  @Input()img: string;
  @ViewChild('swiperr') swiper?:SwiperComponent;
  config: SwiperOptions={
    zoom:true
  };

   constructor(
    private modalctrl:ModalController,
    ) {
      this.img= '';
    
   }

  ngOnInit() {
  }


  zoom(zoomIn:any){
      const zoom= this.swiper?.swiperRef.zoom;
      console.log('yy '+zoom);
      zoomIn? zoom?.in() : zoom?.out();
   }

   close(){
    this.modalctrl.dismiss();
   }

}

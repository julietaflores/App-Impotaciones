import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
declare var google:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement?: ElementRef;
  map: any;
  circle: any;
  latOri: any;
  longOri: any;

  contact = {
    name: '',
    email: '',
    message: '',
    status: '0',
    date: moment().format('YYYY-MM-DD')
  };
  constructor(
    public util: UtilService,
    public api: ApiService
    
  ) {
    console.log('address-->>', this.util.settingInfo.address);
  }

  ngOnInit() {
  }

 

  submit() {


    console.log('contact', this.contact);
    if (this.contact.name === '' || this.contact.email === '' || this.contact.message === '') {
      this.util.errorToast(this.util.translate('All Fields are required'));
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.contact.email)) {
      this.util.errorToast(this.util.translate('Please enter valid email'));
    }

    this.util.show();
    this.api.post_public('v1/contacts/create', this.contact).then((data: any) => {
      this.util.hide();
      if (data && data.status && data.status === 200 && data.data) {
        const param = {
          id: data.data.id,
          mediaURL: this.api.mediaURL,
          subject: this.util.translate('New Mail Request Received'),
          thank_you_text: this.util.translate('You have received new mail'),
          header_text: this.util.translate('New Contact Details'),
          email: this.util.settingInfo.email,
          from_mail: this.contact.email,
          from_username: this.contact.name,
          from_message: this.contact.message,
          to_respond: this.util.translate('We have received your request, we will respond on your issue soon')
        };
        console.log(param);
        this.api.post_public('v1/sendMailToAdmin', param).then((data: any) => {
          console.log(data);
        }, error => {
          console.log(error);
        });
        this.contact.email = '';
        this.contact.name = '';
        this.contact.message = '';
        if (data && data.status === 200) {
          this.util.showToast(this.util.translate('Message sent successfully'), 'success', 'bottom');
        } else {
          this.util.apiErrorHandler(data);
        }
      }

    }, error => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    });
  }

  onBack() {
    this.util.onBack();
  }

}

import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private socialSharing: SocialSharing) {}

  compartilharFacebook() {
    this.socialSharing.shareViaFacebook('Eu estou usando o CookCrawler! Venha você também!', null, 'http://cookcrawler.com.br').then(() => {

    }).catch(e => {  });
  }

  compartilharWhatsapp() {
    this.socialSharing.shareViaWhatsApp('Eu estou usando o CookCrawler! Venha você também!', null, 'http://cookcrawler.com.br').then(() => {

    }).catch(e => {  });
  }

  compartilharTwitter() {
    this.socialSharing.shareViaTwitter('Eu estou usando o CookCrawler! Venha você também! Acesse: http://cookcrawler.com.br').then(() => {

    }).catch(e => {  });
  }

}

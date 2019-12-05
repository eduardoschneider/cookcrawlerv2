import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  isFbUser: number;
  constructor(private fb: Facebook, private socialSharing: SocialSharing, private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.isFbUser = 0;
  }

  compartilharFacebook() {
    this.socialSharing.shareViaFacebook('Eu estou usando o CookCrawler! Venha você também!', null, 'http://cookcrawler.com.br').then(() => {

    }).catch(e => { });
  }

  compartilharWhatsapp() {
    this.socialSharing.shareViaWhatsApp('Eu estou usando o CookCrawler! Venha você também!', null, 'http://cookcrawler.com.br').then(() => {

    }).catch(e => { });
  }

  compartilharTwitter() {
    this.socialSharing.shareViaTwitter('Eu estou usando o CookCrawler! Venha você também! Acesse: http://cookcrawler.com.br').then(() => {

    }).catch(e => { });
  }

  doFbLogout() {
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.isFbUser = data.fbUser;
        if (this.isFbUser === 0) {
          console.log('aqui');
          this.nativeStorage.remove('user');
          this.router.navigate(['/login']);
        } else {
          this.fb.logout()
            .then(res => {
              console.log('aqui2');
              this.nativeStorage.remove('user');
              this.router.navigate(['/login']);
            }, error => {
              console.log(error);
            });
        }
      },
      error => console.error(error)
    );
  }
}

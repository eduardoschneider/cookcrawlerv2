import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoggedIn = false;

  constructor(private fb: Facebook, private router: Router,
              private nativeStorage: NativeStorage, public loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 2000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  onLoginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      this.isLoggedIn = true;
      this.getUserDetail(res.authResponse.userID);
    })
    .catch(e => {
          this.isLoggedIn = false;
          console.log('Error logging into Facebook', e);
        }
      );
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        let navigationExtras: NavigationExtras = {
          state: {
            user: res
          }
        };
        this.router.navigate(['/tabs/tab1'], navigationExtras);
      })
      .catch(e => {
        console.log(e);
      });
  }

}

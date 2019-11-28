import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userExists: any;
  beingLoged: any;
  isLoggedIn = false;

  constructor(private fb: Facebook, private router: Router, private http: HttpClient,
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
        this.checkExistingUser(this.beingLoged.email);
        this.router.navigate(["/tabs/tab1"]);
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
        res.picture = "https://graph.facebook.com/" + userid + "/picture?type=large";
        this.nativeStorage.setItem('facebook_user',
          {
            name: res.name,
            email: res.email,
            picture: res.picture
          })
          .then(() => {
            this.beingLoged = res;
          }, error => {
            console.log(error);
          })
      }).catch(e => {
        console.log(e);
      });
  }

  checkExistingUser(email) {

    const params = new HttpParams().set('email', email);
    this.http.get('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/get', { params: params })
      .subscribe(data => {
        this.userExists = data;
        for (let entry of this.userExists) {
            this.beingLoged = entry;
            return true;
        }

        const params2 = new HttpParams().set('name', this.beingLoged.name)
                                        .set('age', '18')
                                        .set('email', this.beingLoged.email)
                                        .set('password', '12345')
                                        .set('points', '0')
                                        .set('money_saved', '0');
        this.http.post('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/insert', { params: params })
          .subscribe(data => {  });

        return false;
      });
  }

}

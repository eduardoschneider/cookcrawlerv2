import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SingletonService } from '../singleton.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userExists: any;
  beingLoged: { id: number, name: string, age: number, email: string, password: string, points: number, money_saved: number};
  currentEmail;
  isLoggedIn = false;

  constructor(private fb: Facebook, private router: Router, private http: HttpClient,
    private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, private single: SingletonService) { }

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
        this.checkExistingUser(this.currentEmail);
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
        this.beingLoged.name = res.name;
        this.beingLoged.email = res.email;
        this.beingLoged.id = res.id;

        this.currentEmail = res.email;
        //res.picture = "https://graph.facebook.com/" + userid + "/picture?type=large";
      }).catch(e => {
        console.log(e);
      });
  }

  checkExistingUser(email) {

    const params = new HttpParams().set('email', email);
    this.http.get('http://localhost/cookcrawlerapi/api/users/get', { params: params })
      .subscribe(data => {
        this.userExists = data;
        for (let entry of this.userExists) {
            this.beingLoged = entry;
            this.nativeStorage.setItem('user', {user: this.beingLoged})
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
            return true;
        }
        this.beingLoged.age = 18;
        this.beingLoged.password = '12345';
        this.beingLoged.points = 0;
        this.beingLoged.money_saved = 0;
        const params2 = new HttpParams().set('name', this.beingLoged.name)
                                        .set('age', this.beingLoged.age + '')
                                        .set('email', this.beingLoged.email)
                                        .set('password', this.beingLoged.password)
                                        .set('points', this.beingLoged.points + '')
                                        .set('money_saved', this.beingLoged.money_saved + '');
        this.http.post('http://localhost/cookcrawlerapi/api/users/insert', { params: params2 })
          .subscribe(data => {
            this.nativeStorage.setItem('user', {user: this.beingLoged})
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
          });

        return false;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SingletonService } from '../singleton.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userExists: any;
  emailNormal: string;
  passwordNormal: string;
  beingLoged: { id: number, name: string, age: number, email: string, password: string, points: number, money_saved: number};
  fbUser: { id: number, name: string, age: number, email: string, password: string, points: number, money_saved: number};
  currentEmail;
  isLoggedIn = false;
  password;
  constructor(private fb: Facebook, private router: Router, private http: HttpClient, private alertController: AlertController,
              private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, private single: SingletonService) { }

  ngOnInit() {
    this.emailNormal = '';
    this.passwordNormal = '';
    this.beingLoged = { id: -1, name: 'string', age: 0,
                       email: 'string', password: 'string', points: 0, money_saved: 0};
  }

/** LOGIN COM FACEBOOK - INICIO */

  async onLoginFacebook() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 3000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading.present();

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
        this.checkExistingUser(res.email, res.name, res.id);
        // res.picture = "https://graph.facebook.com/" + userid + "/picture?type=large";
      }).catch(e => {
        console.log(e);
      });
  }

  checkExistingUser(email: string, name: string, id: string) {
    // const params = new HttpParams().set('email', email);
    this.http.get('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/get?email=' + email)
      .subscribe(data => {
        this.userExists = data;
        if (this.userExists[0]) {
            this.beingLoged.id = this.userExists[0].id;
            this.beingLoged.name = this.userExists[0].name;
            this.beingLoged.age = this.userExists[0].age;
            this.beingLoged.email = this.userExists[0].email;
            this.beingLoged.password = this.userExists[0].password;
            this.beingLoged.points = this.userExists[0].points;
            this.beingLoged.money_saved = this.userExists[0].money_saved;
            this.nativeStorage.setItem('user', {
              name: this.beingLoged.name,
              email: this.beingLoged.email,
              id: this.beingLoged.id,
              points: this.beingLoged.points,
              money_saved: this.beingLoged.money_saved,
              fbUser: 1
            })
            .then(
              () => {this.router.navigate(['/tabs/tab1']); },
              error => console.error('Error storing item', error)
            );
        } else {
        this.beingLoged.age = 18;
        this.beingLoged.password = '12345';
        this.beingLoged.points = 0;
        this.beingLoged.money_saved = 0;
        const params2 = new HttpParams().set('name', name)
                                        .set('age', this.beingLoged.age + '')
                                        .set('email', email)
                                        .set('password', this.beingLoged.password)
                                        .set('points', this.beingLoged.points + '')
                                        .set('money_saved', this.beingLoged.money_saved + '');
        this.http.post('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/insert', { params: params2 })
          .subscribe(data => {
            this.beingLoged.id = data[0].id;
            this.nativeStorage.setItem('user', {
              name: this.beingLoged.name,
              email: this.beingLoged.email,
              id: this.beingLoged.id,
              points: this.beingLoged.points,
              money_saved: this.beingLoged.money_saved,
              fbUser: 1
            })
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
          });
        }
      });
  }

  /** LOGIN COM FACEBOOK - FIM */

  loginNormal() {
    const params2 = new HttpParams().set('email', this.emailNormal).set('password', this.passwordNormal);
    console.log(this.emailNormal);
    console.log(this.passwordNormal);
    this.http.get('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/get', { params: params2 })
    .subscribe(data => {
      this.userExists = data;
      if (this.userExists[0]) {
          this.beingLoged.id = this.userExists[0].id;
          this.beingLoged.name = this.userExists[0].name;
          this.beingLoged.age = this.userExists[0].age;
          this.beingLoged.email = this.userExists[0].email;
          this.beingLoged.password = this.userExists[0].password;
          this.beingLoged.points = this.userExists[0].points;
          this.beingLoged.money_saved = this.userExists[0].money_saved;
          this.nativeStorage.setItem('user', {
            name: this.beingLoged.name,
            email: this.beingLoged.email,
            id: this.beingLoged.id,
            points: this.beingLoged.points,
            money_saved: this.beingLoged.money_saved,
            fbUser: 0
          })
          .then(
            () => {this.router.navigate(['/tabs/tab1']); },
            error => console.error('Error storing item', error)
          );
      } else {this.userNotFound(); }
    }, error => console.error('Error', error));
  }

  async userNotFound() {
    const alert = await this.alertController.create({
      header: 'Oops',
      subHeader: 'Algo errado...',
      message: 'O usuário não foi encontrado.',
      buttons: ['Vish!']
    });

    await alert.present();
  }
}

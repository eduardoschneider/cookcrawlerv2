import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { SingletonService } from '../singleton.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preparacao-receita',
  templateUrl: './preparacao-receita.page.html',
  styleUrls: ['./preparacao-receita.page.scss'],
})
export class PreparacaoReceitaPage implements OnInit {
  audio: any;
  receita: any;
  user: any;
  name: string;
  id: number;
  email: string;
  age: number;
  points: number;
  money_saved: number;
  fbUser: number;

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }
  constructor(public loadingCtrl: LoadingController, public location: Location, public single: SingletonService,
              private http: HttpClient, private nativeStorage: NativeStorage, public router: Router) { }

  ngOnInit() {
    this.receita = [];
    this.receita = this.single.get1();
    var re = '/\<br>/gi';
    this.receita[0].recipe_description = this.receita[0].recipe_description.replace(re, '<br/>');

    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.name = data.name;
        this.email = data.email;
        this.id = data.id;
        this.points = data.points;
        this.money_saved = data.money_saved;
        this.fbUser = data.fbUser;
      },
      error => console.error(error)
    );
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

    const loading2 = await this.loadingCtrl.create({
      message: 'Atribuindo pontos...',
      duration: 2000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading2.present();

    const { role, data } = await loading.onDidDismiss(); loading2.onDidDismiss();

    const postData = {};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    var newPoints: number;
    newPoints = this.points + this.receita[0].points;
    console.log(newPoints);

    var newMoney: number;
    newMoney = this.money_saved + this.receita[0].money_saved;
    console.log(newPoints);

    this.http.post('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/updatePoints?email='
        + this.email + '&points=' + newPoints + '&money_saved=' + newMoney, postData, httpOptions)
      .subscribe((penis) => {
        this.nativeStorage.setItem('user', {
          name: this.name,
          email: this.email,
          id: this.id,
          points: this.points + this.receita[0].points,
          money_saved: this.money_saved + parseInt(this.receita[0].money_saved),
          fbUser: this.fbUser
        })
        .then(
          () => {this.router.navigate(['/tabs/tab1']); },
          error => console.error('Error storing item', error)
        );
      });
  }

  slide1(description: string) {
    var index = description.indexOf('@');
    return description.substring(0, index);
  }

  slide2(description: string) {
    var index = description.indexOf('@') + 1;
    var index2 = description.indexOf('#');
    return description.substring(index, index2);
  }

  slide3(description: string) {
    var index = description.indexOf('#') + 1;
    var index2 = description.indexOf('$');
    return description.substring(index, index2);
  }

  slide4(description: string) {
    var index = description.indexOf('$') + 1;
    var index2 = description.indexOf('%');
    return description.substring(index, index2);
  }

  slide5(description: string) {
    var index = description.indexOf('%') + 1;
    return description.substring(index, description.length);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingletonService } from '../singleton.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private single: SingletonService,
              private nativeStorage: NativeStorage) {  }
  nome = '';
  ponto = '';
  money = '';
  email = '';
  ngOnInit() { }

  ionViewWillEnter() {
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.nome = data.name;
        this.email = data.email;
        this.money = data.money_saved;
        this.ponto = data.points;
      },
      error => console.error(error)
    );
  }

}

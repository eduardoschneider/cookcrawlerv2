import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingletonService } from '../singleton.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  constructor(private route: ActivatedRoute, private router: Router, private single: SingletonService) {  }
  points;
  ranking;
  money;

  ngOnInit() {
    this.points = this.single.set(5);
    this.ranking = this.single.set2(7);
    this.money = this.single.set3(21);

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.single.saveUser(this.router.getCurrentNavigation().extras.state.user,
         'https://graph.facebook.com/' + this.router.getCurrentNavigation().extras.state.user.id + '/picture?width=1024&height=1024');
      }
    });

    this.users = this.single.getUser();
  }

}

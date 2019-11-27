import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  constructor(private route: ActivatedRoute, private router: Router) {  }

  points = 5;
  ranking = 10659;
  money = 20;

  ngOnInit() {
    this.points += 5;
    this.ranking -= 7;
    this.money += 21;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.users = this.router.getCurrentNavigation().extras.state.user;
        this.users.picture.data.url = 'https://graph.facebook.com/' + this.users.id + '/picture?width=1024&height=1024';
      }
    });
  }
}

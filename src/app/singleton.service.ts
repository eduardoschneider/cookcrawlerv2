import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  points = 5;
  ranking = 10659;
  money = 20;

  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  userPic;
  constructor() {
    console.log('Hello Singleton Provider');
  }

  set(data) {
    this.points += data;
    return this.points;
  }

  set3(data) {
    this.money += data;
    return this.money;
  }

  set2(data) {
    this.ranking -= data;
    return this.ranking;
  }

  saveUser(data, image) {
    this.users = data;
    this.users.picture.data.url = image;
  }

  getUser() {
    return this.users;
  }

}

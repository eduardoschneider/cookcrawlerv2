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
  data = [];
  recipe = [];
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

  set4(data) {
    this.data = data;
  }

  set5(data) {
    console.log('Dado antes de inserir: ' + this.data);
    this.recipe = data;
  }

  get() {
    return this.data;
  }

  get1() {
    console.log('Dado retornado: ' + this.data);
    return this.recipe;
  }

  saveUser(data, image) {
    this.users = data;
    this.users.picture.data.url = image;
  }

  getUser() {
    return this.users;
  }

}

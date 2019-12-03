import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public form = [
    { val: 'Carne', id: 8, isChecked: false },
    { val: 'Cebola', id: 9, isChecked: false },
    { val: 'Creme de Leite', id: 10, isChecked: false },
    { val: 'Tomate', id: 11, isChecked: false },
    { val: 'Tempero', id: 12, isChecked: false },
    { val: 'Ovo', id: 13, isChecked: false },
    { val: 'Bacon', id: 14, isChecked: false },
    { val: 'Farinha de Milho', id: 15, isChecked: false },
    { val: 'Atum', id: 16, isChecked: false },
    { val: 'Maionese', id: 17, isChecked: false },
    { val: 'Salsicha', id: 18, isChecked: false },
    { val: 'Couve-flor', id: 19, isChecked: false },
    { val: 'Azeite', id: 20, isChecked: false },
    { val: 'Requeijão', id: 21, isChecked: false },
    { val: 'Queijo', id: 22, isChecked: false },
    { val: 'Batata', id: 23, isChecked: false },
    { val: 'Presunto', id: 24, isChecked: false },
    { val: 'Manteiga', id: 25, isChecked: false },
    { val: 'Molho de Tomate', id: 26, isChecked: false },
    { val: 'Macarrão', id: 27, isChecked: false },
    { val: 'Leite', id: 28, isChecked: false },
    { val: 'Óleo', id: 29, isChecked: false },
    { val: 'Farinha de Trigo', id: 30, isChecked: false },
    { val: 'Fermento', id: 31, isChecked: false }];

  public checkeds = 0;
  public limit = 5;
  public podecheck = true;
  constructor(private http: HttpClient) { }

  check(entry) {
    if (!entry.isChecked){
      this.checkeds++;
      console.log(this.checkeds);
    } else {
      this.checkeds--;
      console.log(this.checkeds);
    }
  }

  teste() {
    let a = 0;
    let ing1 = 7;
    let ing2 = 7;
    let ing3 = 7;
    let ing4 = 7;
    let ing5 = 7;
    for (let entry of this.form) {
      if (entry.isChecked) {
        if (a === 0) {
          ing1 = entry.id;
          a++;
        } else
        if (a === 1) {
          ing2 = entry.id;
          a++;
        } else
        if (a === 2) {
          ing3 = entry.id;
          a++;
        } else
        if (a === 3) {
          ing4 = entry.id;
          a++;
        } else
        if (a === 4) {
          ing5 = entry.id;
          a++;
        }
      }
    }
    const params = new HttpParams().set('ing1', ing1 + '')
      .set('ing2', ing2 + '')
      .set('ing3', ing3 + '')
      .set('ing4', ing4 + '')
      .set('ing5', ing5 + '');
    this.http.get('http://localhost/cookcrawlerapi/api/recipes/getTeste', { params: params })
      .subscribe(data => {
        console.log(data);
        return false;
      });
  }

}

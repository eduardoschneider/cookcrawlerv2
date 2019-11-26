import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public form = [
    { val: 'Queijo', isChecked: true },
    { val: 'Presunto', isChecked: false },
    { val: 'Farinha', isChecked: false },
    { val: 'Leite', isChecked: true },
    { val: 'Ovos', isChecked: false },
    { val: 'Frango', isChecked: false },
    { val: 'Tomate', isChecked: true },
    { val: 'Azeitona', isChecked: false }
  ];
  constructor() {}

}

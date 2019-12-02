import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public form = [
    { val: 'Queijo', isChecked: false },
    { val: 'Presunto', isChecked: false },
    { val: 'Espinafre', isChecked: false },
    { val: 'Leite', isChecked: false },
    { val: 'Ovos', isChecked: false },
    { val: 'Frango', isChecked: false },
    { val: 'Tomate', isChecked: false },
    { val: 'Queijo', isChecked: false },
    { val: 'Presunto', isChecked: false },
    { val: 'Espinafre', isChecked: false },
    { val: 'Leite', isChecked: false },
    { val: 'Ovos', isChecked: false },
    { val: 'Frango', isChecked: false },
    { val: 'Tomate', isChecked: false },
    { val: 'Azeitona', isChecked: false }
  ];
 public checkeds = 0;
 public podecheck = true;
  constructor() {}

  check(entry) {
    if (this.checkeds < 5) {
      this.checkeds++;
      this.podecheck = true;
    } else {
      this.podecheck = false;
    }
    entry.isChecked = !this.podecheck;
  }

}

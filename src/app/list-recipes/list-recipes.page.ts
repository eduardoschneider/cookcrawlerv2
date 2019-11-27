import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.page.html',
  styleUrls: ['./list-recipes.page.scss'],
})
export class ListRecipesPage implements OnInit {

  constructor(private router: Router, private loadingCtrl: LoadingController, private location: Location) { }

  ngOnInit() {
  }

  async start() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 2000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/preparacao-receita');
  }

  voltar() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { SingletonService } from '../singleton.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.page.html',
  styleUrls: ['./list-recipes.page.scss'],
})
export class ListRecipesPage implements OnInit {
  data: any;
  recipe: any;
  constructor(private router: Router, private route: ActivatedRoute, private loadingCtrl: LoadingController,
              private location: Location, private storage: Storage, private single: SingletonService, private http: HttpClient) {  }

  ngOnInit() {
    this.recipe = [];
    this.data = this.single.get();
    console.log(this.data);
  }

  async start(id: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 2000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.http.get('http://sealsteamcoding.com.br/cookcrawlerapi/api/recipes/get?idrecipes=' + id)
    .subscribe( data => {
      this.recipe = data;
      this.single.set5(this.recipe);
      this.router.navigateByUrl('/preparacao-receita');
    });
  }

  voltar() {
    this.location.back();
  }
}

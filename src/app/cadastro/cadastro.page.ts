import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  nome: string;
  email: string;
  idade: string;
  senha: string;
  constructor(private location: Location, private router: Router, private http: HttpClient,
              public loadingCtrl: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    this.nome = '';
    this.email = '';
    this.idade = '';
    this.senha = '';
  }

  async inserir() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 3000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading.present();

    if ((this.nome !== '') && (this.nome !== '') && (this.nome !== '') && (this.nome !== '')) {
    const postData = {};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/insert?name='
    + this.nome + '&age=' + this.idade + '&email=' + this.email + '&password=' + this.senha
    + '&points=0&money_saved=0', postData, httpOptions).subscribe((penis) => {
      this.sucess();
      this.router.navigate(['/login']);
      }, err => { console.log(err); });
    } else  {
        this.fillFields();
    }
  }

  voltar() {
    this.location.back();
  }

  async fillFields() {
    const alert = await this.alertController.create({
      header: 'Oops',
      message: 'Preencha todos os campos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async sucess() {
    const alert = await this.alertController.create({
      header: 'Bem-vindo!',
      message: 'Usuário cadastrado com sucesso!',
      buttons: ['OK']
    });

    await alert.present();
  }
}

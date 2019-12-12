import { UserApiService } from './../API/user-api.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(private location: Location, private router: Router, public loadingCtrl: LoadingController,
              private alertController: AlertController, private userAPI: UserApiService) { }

  ngOnInit() {
    this.nome = ''; this.email = ''; this.idade = ''; this.senha = ''; }

  async inserir() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 3000,
      showBackdrop: true,
      animated: true,
      spinner: 'crescent',
    });
    await loading.present();

    if ((this.nome !== '') && (this.email !== '') && (this.idade !== '') && (this.senha !== '')) {
      this.userAPI.doNormalSignUp(this.nome, this.email, this.idade, this.senha).then(retorno => {
        this.sucess();
        this.router.navigate(['/login']);
      });
    } else
    {
        this.fillFields();
    }
  }

  /*******************************************************************/
  /** ALERTS */
  /*******************************************************************/

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

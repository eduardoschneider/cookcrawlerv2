import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(private http: HTTP, private location: Location) { }

  ngOnInit() {
  }

  inserir() {
    this.http.post(
      'http://sealsteamcoding.com.br/cookcrawlerapi/api/users/insert',
      {name: 'teste', age: 22, email: 'teste@teste.teste', password: 'asdasd', points: 200, money_saved: '400'},
            { Authorization: 'OAuth2: token' } // Headers
     )
     .then(response => {
        // prints 200
        console.log(response.status);
        try {
          response.data = JSON.parse(response.data);
          // prints test
          console.log(response.data.message);
        } catch(e) {
          console.error('JSON parsing error');
        }
     })
     .catch(response => {
       // prints 403
       console.log(response.status);
 
       // prints Permission denied
       console.log(response.error);
     });
  }

  voltar() {
    this.location.back();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  async doNormalSignUp(nome: string, idade: string, email: string, senha: string) {
    const postData = {};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post('http://sealsteamcoding.com.br/cookcrawlerapi/api/users/insert?name='
    + nome + '&age=' + idade + '&email=' + email + '&password=' + senha
    + '&points=0&money_saved=0', postData, httpOptions).subscribe((penis) => {

    }, err => { console.log(err); });
  }
}

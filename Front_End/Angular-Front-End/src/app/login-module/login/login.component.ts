import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  phone = "dat";
  pass = "abc";
  loginUser: User = {
    username: 'dat',
    password: 'abc'
  };
  urlAPI: UrlAPIEntity;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  login(): void {
    console.log("Login");
    //change your url name here
    this.urlAPI = listUrlAPI.find(url => url.name === 'loginResource');
    console.log(this.urlAPI);
    this.loginUser.username = this.phone;
    this.loginUser.password= this.pass;
    console.log(this.loginUser.username);
    console.log(this.loginUser.password);
    this.http.post<HttpResponse<Object>>(this.urlAPI.path, this.loginUser, httpOptions)
    .subscribe(
       response => {
         console.log( response.body )
       }
     );
  }
}

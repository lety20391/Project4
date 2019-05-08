import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { JWTHeaderService } from '../../jwtheader.service';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//     // 'Authorization': 'my-auth-token'
//   })
// };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  phone = "dat";
  pass: string = '';
  loginUser: User = {
    username: 'dat',
    password: 'abc'
  };
  urlAPI: UrlAPIEntity;
  currentID: number = 1000;
  logClass = '--Login Component:';
  isRecievedCode = false;
  isLogined = false;

  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
  }

  getCode(): void {
    console.log("getCode");
    //change your url name here
    this.urlAPI = listUrlAPI.find(url => url.name === 'loginResource');
    console.log(this.urlAPI);
    this.loginUser.username = this.phone;
    this.loginUser.password= this.pass;
    console.log(this.loginUser.username);
    console.log(this.loginUser.password);

    this.http.post<HttpResponse<Object>>(
      this.urlAPI.path,
      this.loginUser,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response'
      }
    ).subscribe(
       response => {
         console.log( response);
         if ( response.status == 200){
           this.isRecievedCode = true;
         }
         // console.log( response.status );
         // console.log( response.headers.get('Authorization') );
         // let auth = response.headers.get('Authorization');
         // this.jwtService.addJWT(auth);
         // console.log('Get jwt: ' + this.jwtService.getJWT());
       }
     );
  }

  login(): void{
    console.log("Login");
    //change your url name here
    this.urlAPI = listUrlAPI.find(url => url.name === 'loginResource');
    console.log(this.urlAPI);
    this.loginUser.username = this.phone;
    this.loginUser.password= this.pass;
    console.log(this.loginUser.username);
    console.log(this.loginUser.password);
    this.http.post<HttpResponse<Object>>(
      this.urlAPI.path,
      this.loginUser,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response'
      }
    ).subscribe(
       response => {
         console.log( response);
         console.log( response.status );
         if (response.status == 200){
           this.isLogined = true;
         }
         console.log( response.headers.get('Authorization') );
         let auth = response.headers.get('Authorization');
         this.jwtService.addJWT(auth);
         console.log('Get jwt: ' + this.jwtService.getJWT());
       }
     );
  }

  getUserImage():void {
    console.log(this.logClass + ' GetUserImage()');
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { User } from '../user';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { JWTHeaderService } from '../../jwtheader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
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
  listImage: string[] = [];

  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService,
    private route: Router
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
           console.log('---Login success--');
           this.isRecievedCode = true;
           console.log('login: ID:' + response.body);
           this.currentID = +response.body;
           this.getUserImage(this.currentID);


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
           console.log( response.headers.get('Authorization') );
           let auth = response.headers.get('Authorization');
           this.jwtService.addJWT(auth);
           console.log('Get jwt: ' + this.jwtService.getJWT());
           this.route.navigate(['/ecom/products']);
         }else{
           this.pass = 'Please Enter Code Again';
         }

       }
     );
  }

  getUserImage(id: number): void{
    console.log(this.logClass + " Get All Image");
    console.log(this.logClass + ' get All Image for user' + id);
    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
    this.http.get<string[]>(this.urlAPI.path + '/Admin/' + id)
    .subscribe(
      result => {
                  console.log(this.logClass + ' Image Load');
                  this.listImage = result;
                }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { JWTHeaderService } from '../../jwtheader.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
  listImage: string[] = [];

  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService,
    private route: Router,
    private location: Location
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
           console.log('login: ID:' + response.body);
           this.currentID = +response.body;

           //lay hinh anh user tu tren server ve
           this.getUserImage(this.currentID);
         }else{
           console.log(this.logClass + 'Cannot Find Your Phone');
           this.phone = 'Cannot Find Your Phone';
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
           //luu UserID vao trong localStorage
           localStorage.setItem('UserID', this.currentID.toString());
           if(this.phone == 'dat' && this.pass == 'abc')
            localStorage.setItem('UserID', '1');

           this.isLogined = true;
           console.log( response.headers.get('Authorization') );
           let auth = response.headers.get('Authorization');
           this.jwtService.addJWT(auth);
           console.log('Get jwt: ' + this.jwtService.getJWT());
           this.location.back();
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
    this.http.get<string[]>(this.urlAPI.path + '/User/' + id)
    .subscribe(
      result => {
                  console.log(this.logClass + ' Image Load');
                  this.listImage = result;
                }
    );
  }
}

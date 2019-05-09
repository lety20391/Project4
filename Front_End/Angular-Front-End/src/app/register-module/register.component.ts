import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../UserEntity/UserEntity';
import { RegisterService } from './register.service';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ID: number;
  Name: string;
  Telephone: string;
  Mail: string;
  DOB: string;
  Status: boolean = true;
  keyCode = "";
  key_dateCreated = "";
  pickedDOB : string;

  UrlEntity : UrlAPIEntity;
  uploadUrl = '';
  user: UserEntity = new UserEntity();
  newUser: UserEntity = new UserEntity();
  logClass: "Log create user";
  isReadyToUploadImage = false;
  inputID: number;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getUrl(code: number): void{
    //code will be use to create image Folder on server
    console.log("------Create User: getUrl() ------");
    //change your url name here
    this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
    this.uploadUrl = this.UrlEntity.path + "/file/" + "User/" + code;
    console.log(this.uploadUrl);
  }
  registerNewUser(): void {
    this.UrlEntity = listUrlAPI.find(url=> url.name === 'registerResource');
    this.user.userID = this.ID;
    this.user.userName = this.Name;
    this.user.userTel = this.Telephone;
    this.user.userMail = this.Mail;
    this.user.userDOB = this.DOB;
    this.user.userStatus = this.Status;
    this.user.keyCode = this.keyCode;
    this.user.key_dateCreated = this.key_dateCreated;
      //    format lai date time
    let pickedDOB = this.user.userDOB;
    pickedDOB = formatDate(pickedDOB, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(pickedDOB, 'hh:mm:ss', 'en-US');
    console.log(this.logClass + ' DOB:' + pickedDOB);
    this.user.userDOB = pickedDOB;
          //
          // this.user.userID = 1;
    this.http.post<UserEntity>(this.UrlEntity.path, this.user, httpOptions).subscribe(
            response => {
                if(response == null)
                {
                  
                  this.router.navigateByUrl('/mainlayout/login');
                }
            }
          );
        }
}
import { Component, OnInit, Input } from '@angular/core';
import { UserEntity } from '../UserEntity/UserEntity';
import { RegisterService } from './register.service';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
// import { UploadComponent } from '../UIComponent/upload/upload.component';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };
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
  max = new Date(2004,11,31);
  UrlEntity : UrlAPIEntity;
  // uploadUrl = '';
  user: UserEntity = new UserEntity();
  newUser: UserEntity = new UserEntity();
  logClass: "Log create user";
  isReadyToUploadImage = false;
  inputID: number;
  showSpinner = false;
    @Input() uploadUrl = '';
    @Input() buttonTitle = 'Submit';
  @Input() isInUpdateMode = false;

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit() {
  }
  turnLoginPage(): void {
    this.router.navigateByUrl("/mainlayout/login");
  }
  getUrl(code: number): void{
    //code will be use to create image Folder on server
    console.log("------Create User: getUrl() ------");
    //change your url name here
    this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
    this.uploadUrl = this.UrlEntity.path + "/file/" + "User/" + code;
    console.log(this.uploadUrl);
  }


    createNewUser(newUser: UserEntity): void {
      this.UrlEntity = listUrlAPI.find(url=> url.name === 'registerResource');
       this.http.post<HttpResponse<UserEntity>>(this.UrlEntity.path ,  newUser, {observe: 'response'});
    }


    registerNewUser(): void{
    // this.user.userID = this.ID;
    this.user = new UserEntity();
    this.user.userName = this.Name;
    this.user.userTel = this.Telephone;
    this.user.userMail = this.Mail;
    this.user.userDOB = this.DOB;
    this.user.userStatus = this.Status;
    // this.user.keyCode = this.keyCode;
    // this.user.key_dateCreated = this.key_dateCreated;
      //    format lai date time
    let pickedDOB = this.user.userDOB;
    pickedDOB = formatDate(pickedDOB, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(pickedDOB, 'hh:mm:ss', 'en-US');
    console.log(this.logClass + ' DOB:' + pickedDOB);
    this.user.userDOB = pickedDOB;
    this.UrlEntity = listUrlAPI.find(url=> url.name === 'registerResource');
     // this.http.post<HttpResponse<UserEntity>>(this.UrlEntity.path ,  this.user , {observe: 'response'}).subscribe(
     //        response => {
     //              if(response.status == 200)
     //                  {
     //                    let currentUserID = JSON.parse(JSON.stringify(response.body));
     //                  this.showSpinner = true;
     //                  setTimeout(() =>{
     //                    this.showSpinner = false,
     //                    this.getUrl(currentUserID);
     //                    this.isReadyToUploadImage = true;
     //                  }, 4000);
     //                }
     //      //end spinner
     //                },
     //      err => {
     //        console.log("lêu lêu");
     //        console.log("error code: " + err.status);
     //      }
     //      );


     //test
     this.http.post<UserEntity>(this.UrlEntity.path ,  this.user , {observe: 'response'})
          .pipe(
            catchError(
              error => {
                console.log("error:::" + error.status);
                return of(error);
              }
            )
          )
          .subscribe(
            response => {
                  if(response.status == 200)
                      {
                        let currentUserID = JSON.parse(JSON.stringify(response.body));
                      this.showSpinner = true;
                      setTimeout(() =>{
                        this.showSpinner = false,
                        this.getUrl(currentUserID);
                        this.isReadyToUploadImage = true;
                      }, 4000);
                    }
          //end spinner
                    },
          error => {
            console.log("lêu lêu");
            console.log("error code: " + error.status);
          }
          );
        }

}

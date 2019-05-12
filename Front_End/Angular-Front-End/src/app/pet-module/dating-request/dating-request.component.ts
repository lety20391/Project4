import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DatingDetailEntity} from '../DatingDetailEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UrlAPIEntity } from 'src/app/UrlAPIEntity';
import {DatingMasterEntity} from 'src/app/pet-module/DatingMasterEntity';

@Component({
  selector: 'app-dating-request',
  templateUrl: './dating-request.component.html',
  styleUrls: ['./dating-request.component.css']
})
export class DatingRequestComponent implements OnInit {
  logClass= '--Dating Request Component: ';

  @Input() ID_urlImg1 = 'http://localhost:9090/assets/dummy-img-400x400.jpg';
  @Input() ID_urlImg2 = 'http://localhost:9090/assets/dummy-img-400x400.jpg';

  receivedData: DatingDetailEntity = new DatingDetailEntity();

  urlAPI: UrlAPIEntity;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<DatingRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {  }

  ngOnInit() {
    this.getInjectedData();
  }

  getInjectedData(): void{
    console.log(this.logClass + ' data received: ' +  JSON.stringify(this.data));
    this.receivedData = JSON.parse(JSON.stringify(this.data));
    console.log(this.logClass + ' url1: ' + this.receivedData.petRequestEntity.petListImage[0] );
    this.ID_urlImg1 = this.receivedData.petRequestEntity.petID + '/' +  this.receivedData.petRequestEntity.petListImage[0];
    this.ID_urlImg2 = this.receivedData.petRecieveEntity.petID + '/' +  this.receivedData.petRecieveEntity.petListImage[0];
  }

  save() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

    sendRequestDating2Server(): void{
      // this.receivedData
      console.log(this.logClass + "  send Dating 2 Server: " + this.receivedData.petRequestEntity.petName);
      this.urlAPI = listUrlAPI.find(url => url.name === 'datingDetailResource');
      console.log(this.logClass + this.urlAPI.path)
      this.receivedData.datingMasterEntity = new DatingMasterEntity();
      this.receivedData.datingMasterEntity.datingMasterID = 1;
      this.receivedData.isAccepted = false;
      this.http.post<HttpResponse<Object[]>>(this.urlAPI.path + "/Post", this.receivedData ,  { observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.close();


              }
              // if (response.status == 200){
              //   this.isLogined = true;
              //   console.log( response.headers.get('Authorization') );
              //   let auth = response.headers.get('Authorization');
              //   this.jwtService.addJWT(auth);
              //   console.log('Get jwt: ' + this.jwtService.getJWT());
              // }else{
              //   this.pass = 'Please Enter Code Again';
              // }

            }
      );
    }

}

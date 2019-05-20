import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PetEntity } from '../PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DatingDetailEntity} from '../DatingDetailEntity';

import {DatingRequestComponent} from '../dating-request/dating-request.component';
import { Router } from '@angular/router';
import {JWTHeaderService} from '../../jwtheader.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-list-dating',
  templateUrl: './list-dating.component.html',
  styleUrls: ['./list-dating.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ListDatingComponent implements OnInit {

    //Age Slider
    minValue: number = 1;
    maxValue: number = 5;
    options: Options = {
      floor: 0,
      ceil: 20,
      step: 1
    };


    listPet: PetEntity[] = [];
    logClass = '--list-dating: ';
    urlAPI: UrlAPIEntity;
    myListPet: PetEntity[] = [];
    currentUserID: number;
    isCustomerPetSelected = false;

    userPet: PetEntity = new PetEntity();
    customerPet: PetEntity = new PetEntity();
    isShowDetail = false;

    newRequestDating: DatingDetailEntity = new DatingDetailEntity();

    searchNameAndBreed: string = '';



    constructor(
      private http: HttpClient,
      private dialog: MatDialog,
      private route: Router,
      private jwtService: JWTHeaderService
    ) {  }

    ngOnInit() {
      this.checkJWT();
      this.loadScript('./assets/js/search.js');
      //this.checkLogin();
      //this.checkLoginByServer();
      this.getCurrentUserID();
      this.getListPet();
      this.getMyListPet();
      //this.openDialog();
    }

    //check JWT de kiem tra login so bo
    checkJWT(): void{
      let tempJWT = this.jwtService.getJWT();
      if(tempJWT == null || tempJWT == '')
        this.route.navigate(['/mainlayout/login']);
    }

    // checkLoginByServer(): void{
    //   if( !this.chkLoginServer.isLogined())
    //     this.route.navigate(['/mainlayout/login']);
    // }

    //load external js file into component
    public loadScript(url: string) {
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    }

    checkLogin(): void{
      let stringID = localStorage.getItem('UserID');
      if( stringID == null || stringID == '')
        this.route.navigate(['/mainlayout/login']);
    }

    getCurrentUserID(): void{
      let tempID = localStorage.getItem('UserID');
      if (tempID != null && tempID != ''){
        this.currentUserID = 0;
        //chuyen tu string ve number
        this.currentUserID = parseInt(tempID);
      }
    }

    getMyListPet(): void{
      console.log(this.logClass + ' get my list Pet');
      this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
      console.log(this.logClass + this.urlAPI.path);
      this.http.get<HttpResponse<Object[]>>(this.urlAPI.path + "/list/" + this.currentUserID,  { observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.myListPet = JSON.parse(JSON.stringify(response.body));

                //voi moi item trong danh sach Pet minh goi len server lay danh sach Image
                this.myListPet.forEach(
                  item => {
                    //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
                    item.petListImage = [];
                    console.log(this.logClass + " getImagePath");
                    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                    console.log(this.logClass + this.urlAPI.path);

                    //goi len server de lay danh sach hinh anh ve
                    this.http.get<string[]>(this.urlAPI.path + '/Pet/' + item.petID)
                      .subscribe(
                        result => {
                                    console.log(this.logClass + ' Image Load:' + result);
                                    //gan ket qua tra ve vao thuoc tinh petListImage
                                    item.petListImage = result;
                                  }
                    );

                    //goi len server de lay danh sach Dating Detail tra ve
                    this.urlAPI = listUrlAPI.find(url => url.name === 'datingDetailResource');
                    this.http.get<DatingDetailEntity[]>(this.urlAPI.path + '/list/' + item.petID)
                      .subscribe(
                        result => {
                                    console.log(this.logClass + ' Dating Load:' + result.length);
                                    //gan ket qua tra ve vao thuoc tinh petListImage
                                    item.listDatingDetail = result;
                                    item.totalDatingRequestNeedAccept = 0;
                                    item.listDatingDetail.forEach(
                                      datingDetail => {
                                        if(datingDetail.isAccepted == false)
                                          item.totalDatingRequestNeedAccept += 1;
                                      }
                                    );
                                  }
                    );


                  }
                );


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

    getListPet(): void{
      console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
      console.log(this.logClass + this.urlAPI.path)

      this.http.get<HttpResponse<Object[]>>(this.urlAPI.path + '/list/Except/' + this.currentUserID,  { observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listPet = JSON.parse(JSON.stringify(response.body));

                //voi moi item trong danh sach Pet minh goi len server lay danh sach Image
                this.listPet.forEach(
                  item => {
                    //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
                    item.petListImage = [];
                    console.log(this.logClass + " getImagePath");
                    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                    console.log(this.logClass + this.urlAPI.path);

                    //goi len server de lay danh sach hinh anh ve
                    this.http.get<string[]>(this.urlAPI.path + '/Pet/' + item.petID)
                    .subscribe(
                      result => {
                                  console.log(this.logClass + ' Image Load:' + result);
                                  //gan ket qua tra ve vao thuoc tinh petListImage
                                  item.petListImage = result;
                                }
                    );
                  }
                );


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

    getImagePath(id: number): string[]{
      console.log(this.logClass + " getImagePath");
      this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
      console.log(this.logClass + this.urlAPI.path);

      let listAllImage: string[] = [];

      this.http.get<string[]>(this.urlAPI.path + '/Pet/' + id)
      .subscribe(
        result => {
                    console.log(this.logClass + ' Image Load:' + result);
                    listAllImage = result;
                  }
      );
      return listAllImage;



    }

    getPetDetail(event: Event):void {
      console.log(this.logClass + ' pet selected: ');
      console.log(JSON.stringify(event));
      this.userPet = JSON.parse(JSON.stringify(event));
    }

    getCustomerPetDetail(selectedPet: PetEntity): void{
      console.log(this.logClass + ' get Customer Pet: ' + selectedPet.petName);
      this.customerPet = selectedPet;
      this.isShowDetail = true;
      //this.openDialog();
    }

    revertShowDetail(): void{
      this.isShowDetail = !this.isShowDetail;
    }

    getDetailDating(event: Event):void{
      console.log(this.logClass + ' Dating Detail: ');
      console.log(JSON.stringify(event));
      this.newRequestDating = JSON.parse(JSON.stringify(event));
      this.summaryDataAndSend();
    }

    summaryDataAndSend(): void{
      this.newRequestDating.petRequestEntity = this.userPet;
      this.newRequestDating.petRecieveEntity = this.customerPet;
      console.log(this.logClass + ' Dating Detail:');
      console.log(JSON.stringify(this.newRequestDating));
      this.openDialog(this.newRequestDating);

    }

    searchPet(): void{

      console.log(this.logClass + ' get my list Pet');
      this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');

      this.http.get<PetEntity[]>(this.urlAPI.path + '/list/Search/' + this.searchNameAndBreed)
          .subscribe(
                response => {
                      this.listPet = JSON.parse(JSON.stringify(response));
                      this.listPet.forEach(
                              item => {
                                    item.petListImage = [];
                                    console.log(this.logClass + " getImagePath");
                                    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                                    console.log(this.logClass + this.urlAPI.path);

                                    //goi len server de lay danh sach hinh anh ve
                                    this.http.get<string[]>(this.urlAPI.path + '/Pet/' + item.petID)
                                    .subscribe(
                                      result => {
                                                  console.log(this.logClass + ' Image Load:' + result);
                                                  //gan ket qua tra ve vao thuoc tinh petListImage
                                                  item.petListImage = result;
                                                }
                                    );
                              }
                      );
                }
          );
    }

    openDialog(requestDating: DatingDetailEntity) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = requestDating;

        this.dialog.open(DatingRequestComponent, dialogConfig);
        //const dialogRef = this.dialog.open(DatingRequestComponent, dialogConfig);
    }

}

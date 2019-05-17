import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SimpleDialogComponent } from '../../UIComponent/simple-dialog/simple-dialog.component';
import {DatingDetailEntity} from '../DatingDetailEntity';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import {JWTHeaderService} from '../../jwtheader.service';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.css']
})
export class ListPetComponent implements OnInit {


  myListPet: PetEntity[] = [];
  logClass = '--list-pet: ';
  urlAPI: UrlAPIEntity;
  currentUserID: number;
  currentPet: PetEntity = new PetEntity();
  petImageUrl: string;
  currentDating: DatingDetailEntity = new DatingDetailEntity();


  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.checkJWT();
    this.loadScript('./assets/js/search.js');
    this.getCurrentUserID();
    this.getMyListPet();
    this.currentPet.listDatingDetail = [];
    this.currentDating.petRequestEntity = new PetEntity();
  }

  //check JWT de kiem tra login so bo
  checkJWT(): void{
    let tempJWT = this.jwtService.getJWT();
    if(tempJWT == null || tempJWT == '')
      this.router.navigate(['/mainlayout/login']);
  }

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
                                      if(datingDetail.specialStatus == 0 && datingDetail.isNewNotification == true)
                                        item.totalDatingRequestNeedAccept += 1;
                                    }
                                  );
                                }
                  );

                  //goi len server de lay danh sach Answer Detail tra ve
                  this.http.get<DatingDetailEntity[]>(this.urlAPI.path + '/listRequestFrom/' + item.petID)
                    .subscribe(
                      result => {
                                  console.log(this.logClass + ' Dating Load:' + result.length);
                                  //gan ket qua tra ve vao thuoc tinh petListImage
                                  item.listAnswerDetail = result;
                                  item.totalNewDatingAnswer = 0;
                                  item.listAnswerDetail.forEach(
                                    ansDetail => {

                                      //tinh so luong new Answer de lam notification
                                      if(ansDetail.isNewNotification == true
                                            && (ansDetail.specialStatus == 1 || ansDetail.specialStatus == 3))
                                        item.totalNewDatingAnswer += 1;

                                      //load image cua Pet ve
                                      console.log(this.logClass + " Answer: getImagePath");
                                      this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                                      console.log(this.logClass + this.urlAPI.path);

                                      //goi len server de lay danh sach hinh anh ve
                                      this.http.get<string[]>(this.urlAPI.path + '/Pet/' + ansDetail.petRecieveEntity.petID)
                                      .subscribe(
                                        result => {
                                                    console.log(this.logClass + ' Image Load:' + result);
                                                    //gan ket qua tra ve vao thuoc tinh petListImage
                                                    ansDetail.petRecieveEntity.petListImage = result;
                                                  }
                                      );


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

  getPetSelected(event: Event): void{
    console.log(this.logClass + JSON.stringify(event));
    this.currentPet = JSON.parse(JSON.stringify(event));
    console.log(this.logClass + ' getPetSelected: ' + this.currentPet.petName);
    this.urlAPI = listUrlAPI.find(url => url.name === 'uploadResource');
    this.petImageUrl = this.urlAPI.path + '/file/Pet/' + this.currentPet.petID;
    //this.currentDating = new DatingDetailEntity();
    //get all User Image for pet Request Dating
    this.currentPet.listDatingDetail.forEach(
      dating => {

        let id = dating.petRequestEntity.userEntity.userID;
        console.log(this.logClass + ' get All Image for user' + id);
        //get User Owner Image
        this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
        this.http.get<string[]>(this.urlAPI.path + '/User/' + id)
        .subscribe(
          result => {
                      console.log(this.logClass + ' Image Load');
                      dating.petRequestEntity.userEntity.listUserImage = result;
                    }
        );

        //get Pet Request image
        this.http.get<string[]>(this.urlAPI.path + '/Pet/' + dating.petRequestEntity.petID)
        .subscribe(
          result => {
                      console.log(this.logClass + ' Image Load');
                      dating.petRequestEntity.petListImage = result;
                    }
        );
      }
    );

    this.currentDating = new DatingDetailEntity();
    this.currentDating.petRequestEntity = new PetEntity();

  }

  updateCurrentPet(): void{
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
    this.http.put<HttpResponse<PetEntity>>(this.urlAPI.path + '/update', this.currentPet, { observe: 'response' })
      .subscribe (
        response => {
          console.log( response);
          console.log( response.status );
          if (response.status == 200){
            console.log(this.logClass + ' update Successfully');
            //this.openDeleteDialog();
            this.getMyListPet();
          }
        }
      );
  }

  updateCurrentDating(updatedDating: DatingDetailEntity): void{
    this.urlAPI = listUrlAPI.find(url => url.name === 'datingDetailResource');
    this.http.put<HttpResponse<PetEntity>>(this.urlAPI.path + '/update', updatedDating, { observe: 'response' })
      .subscribe (
        response => {
          console.log( response);
          console.log( response.status );
          if (response.status == 200){
            console.log(this.logClass + ' update Dating Successfully');
            //this.openDeleteDialog();
            this.getMyListPet();
          }
        }
      );
  }

  deletePet(): void{
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
    this.currentPet.petStatus = false;
    this.http.put<HttpResponse<PetEntity>>(this.urlAPI.path + '/update', this.currentPet, { observe: 'response' })
      .subscribe (
        response => {
          console.log( response);
          console.log( response.status );
          if (response.status == 200){
            console.log(this.logClass + ' update Pet Successfully');
            //this.openDeleteDialog();
            this.getMyListPet();
          }
        }
      );
  }

  getDatingSelected(event: Event): void{
    let tempDating = new DatingDetailEntity();
    tempDating = JSON.parse(JSON.stringify(event));
    if( (tempDating.datingDetailID == this.currentDating.datingDetailID) && (tempDating.isAccepted != this.currentDating.isAccepted ))
      this.updateCurrentDating(tempDating);
    this.currentDating = tempDating;
    console.log(this.logClass + 'get Selected Dating isAccepted: ' + this.currentDating.isAccepted);
    console.log(this.logClass + ' get Selected Dating from: '+ this.currentDating.petRequestEntity.petName);
  }

  openDeleteDialog(): void {
        const dialogRef = this.dialog.open(SimpleDialogComponent, {
          width: '350px',
          data: "Successfully Update Your Pet "
        });

        dialogRef.afterClosed()
        .subscribe(result => {
          if(result) {
            console.log('Yes clicked');
            //this.deleteServiceDetail();
            // DO SOMETHING
            // this.location.back();
            this.getMyListPet();
          }
        });
      }

  // getListPet(): void{
  //   console.log(this.logClass + " init");
  //   this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
  //   console.log(this.logClass + this.urlAPI.path)
  //
  //   this.http.get<HttpResponse<Object[]>>(this.urlAPI.path + "/list",  { observe: 'response' })
  //     .subscribe(
  //         response => {
  //           console.log( response);
  //           console.log( response.status );
  //           if (response.status == 200){
  //             console.log(this.logClass + " response: " + response);
  //             //chuyen du lieu tu response.body ve lai kieu array
  //             //roi gan vao listPet
  //             console.log(JSON.stringify(response.body));
  //             this.listPet = JSON.parse(JSON.stringify(response.body));
  //
  //             //voi moi item trong danh sach Pet minh goi len server lay danh sach Image
  //             this.listPet.forEach(
  //               item => {
  //                 //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
  //                 item.petListImage = [];
  //                 console.log(this.logClass + " getImagePath");
  //                 this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
  //                 console.log(this.logClass + this.urlAPI.path);
  //
  //                 //goi len server de lay danh sach hinh anh ve
  //                 this.http.get<string[]>(this.urlAPI.path + '/Pet/' + item.petID)
  //                 .subscribe(
  //                   result => {
  //                               console.log(this.logClass + ' Image Load:' + result);
  //                               //gan ket qua tra ve vao thuoc tinh petListImage
  //                               item.petListImage = result;
  //                             }
  //                 );
  //               }
  //             );
  //
  //
  //           }
  //           // if (response.status == 200){
  //           //   this.isLogined = true;
  //           //   console.log( response.headers.get('Authorization') );
  //           //   let auth = response.headers.get('Authorization');
  //           //   this.jwtService.addJWT(auth);
  //           //   console.log('Get jwt: ' + this.jwtService.getJWT());
  //           // }else{
  //           //   this.pass = 'Please Enter Code Again';
  //           // }
  //
  //         }
  //   );
  // }
  //
  // getImagePath(id: number): string[]{
  //   console.log(this.logClass + " getImagePath");
  //   this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
  //   console.log(this.logClass + this.urlAPI.path);
  //
  //   let listAllImage: string[] = [];
  //
  //   this.http.get<string[]>(this.urlAPI.path + '/Pet/' + id)
  //   .subscribe(
  //     result => {
  //                 console.log(this.logClass + ' Image Load:' + result);
  //                 listAllImage = result;
  //               }
  //   );
  //   return listAllImage;
  //
  //
  //
  // }
}

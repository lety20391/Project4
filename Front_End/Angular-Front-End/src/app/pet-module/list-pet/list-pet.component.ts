import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DatingDetailEntity } from '../DatingDetailEntity';

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


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadScript('./assets/js/search.js');
    this.getCurrentUserID();
    this.getMyListPet();
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

  getPetSelected(event: Event): void{
    this.currentPet = JSON.parse(JSON.stringify(event));
    console.log(this.logClass + ' getPetSelected: ' + this.currentPet.petName);
    this.urlAPI = listUrlAPI.find(url => url.name === 'uploadResource');
    this.petImageUrl = this.urlAPI.path + '/file/Pet/' + this.currentPet.petID;

  }

  updateCurrentPet(): void{

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

import { Component, OnInit, Input } from '@angular/core';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { PetManageService} from '../pet-manage.service';
import { serviceEntity } from '../serviceEntity/serviceEntity';
import { UserEntity } from '../UserEntity/UserEntity';
import { DatePipe, formatDate } from '@angular/common';
import { BookingDetailEntity } from './BookingDetailEntity';
import { ServiceManageService} from '../service-module/service-manage.service';
import { PetEntity} from '../pet-module/PetEntity';
import { HttpResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListPetComponent } from '../pet-module/list-pet/list-pet.component'; //de get list;
import { BookingMasterEntity} from './BookingMasterEntity';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @Input() userdetail = new UserEntity();
@Input() myListPet: PetEntity[] = [];
@Input() listservice: serviceEntity[] = [];
  listPet: PetEntity[] = [];
  logClass = '--booking--service: ';
  urlAPI: UrlAPIEntity;
  tempID : number ;
  currentUserID: number;
  newBm: BookingMasterEntity = new BookingMasterEntity() ;
  selectedPet : PetEntity = new PetEntity();
  booknewService: BookingDetailEntity = new BookingDetailEntity();
  selectedService: serviceEntity = new serviceEntity();
  currentbmID: number;
  currentStatus = true;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private serviceManageService: ServiceManageService
  ) { }

  ngOnInit() {
    this.getServiceList();
    this.getCurrentUserID();
    this.UserDetail();
    // this.createBookingMaster();
    this.getListPet();
    this.getMyListPet();
    }

    setPet(event: Event): void {
      console.log(JSON.stringify(event));
      this.selectedPet = this.myListPet.find(pet => JSON.stringify(pet.petID) == JSON.stringify(event));
    }
    createBooking(): void {
      this.newBm.userEntity = new UserEntity();
      this.newBm.userEntity.userID = this.currentUserID;
      this.addNewBookingMaster(this.newBm).subscribe(
        response => {
          console.log("this booking ID: " + response.bookingID);
          this.currentbmID = response.bookingID;
          this.createNew();
        }
      );
    }
    bookservice(newBd: BookingDetailEntity): Observable<BookingDetailEntity>{
      this.urlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
      return this.http.post<BookingDetailEntity>(this.urlAPI.path + '/Post', newBd);
    }
    createNew(): void {
      this.booknewService.bookingMasterEntity = new BookingMasterEntity();
      this.booknewService.bookingMasterEntity.bookingID = this.currentbmID;
      this.booknewService.bdstatus = this.currentStatus;
      this.booknewService.serviceEntity = new serviceEntity();
      this.booknewService.serviceEntity.serID = this.selectedService.serID;
      console.log("this is service ID: " + this.booknewService.serviceEntity.serID);
      this.bookservice(this.booknewService).subscribe();
    }

    getServiceList(): void{
        this.serviceManageService.getServiceList().subscribe(
        result => {this.listservice = result} );
    }
    addNewBookingMaster(newBm: BookingMasterEntity): Observable<BookingMasterEntity> {
      this.urlAPI = listUrlAPI.find(url => url.name === 'bookingMasterResource');
      return this.http.post<BookingMasterEntity>(this.urlAPI.path + '/Post', newBm);
    }
    getUserDetail(id: number): Observable<any> {
      console.log("------Get API user detail Service ------");
      this.urlAPI = listUrlAPI.find(url => url.name === 'userDetailResource');
      // const url = `${this.urlAPI}/${id}`;
      console.log("this is user id:" + id)
      return this.http.get(this.urlAPI.path + '/' + id);

    }
    UserDetail(): void {
      const id = this.currentUserID;
        this.getUserDetail(id)
          .subscribe(detail => this.userdetail = detail);
      }

  getCurrentUserID(): void{
    let tempID = localStorage.getItem('UserID');
    if (tempID != null && tempID != ''){
      this.currentUserID = 0;
      //chuyen tu string ve number
      this.currentUserID = parseInt(tempID);
      console.log("this is user: " + this.currentUserID);
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

    this.http.get<HttpResponse<Object[]>>(this.urlAPI.path + "/list",  { observe: 'response' })
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

}

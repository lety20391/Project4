import { Component, OnInit, Input,Output, EventEmitter,Injectable } from '@angular/core';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serviceEntity } from '../serviceEntity/serviceEntity';
import { UserEntity } from '../UserEntity/UserEntity';
import { DatePipe, formatDate, Location } from '@angular/common';
import { BookingDetailEntity } from './BookingDetailEntity';
import { ServiceManageService} from '../service-module/service-manage.service';
import { PetEntity} from '../pet-module/PetEntity';
import { HttpResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPetComponent } from '../pet-module/list-pet/list-pet.component'; //de get list;
import { BookingMasterEntity} from './BookingMasterEntity';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('bookserviceForm') myForm;
  @Input() userdetail = new UserEntity();
@Input() myListPet: PetEntity[] = [];
@Input() listservice: serviceEntity[] = [];
  listPet: PetEntity[] = [];
  logClass = '--booking--service: ';
  urlAPI: UrlAPIEntity;
  tempID :number ;
  sertempID: number;
  bookSuccess = false;
  currentUserID: number;
  newBm: BookingMasterEntity = new BookingMasterEntity() ;
  selectedPet : PetEntity = new PetEntity();
  choosenService: serviceEntity = new serviceEntity();
  booknewService: BookingDetailEntity = new BookingDetailEntity();
  selectedService: serviceEntity = new serviceEntity();
  currentbmID: number;
  currentStatus = false;
  min = new Date();
  max = new Date();
//service -cart
@Output() bookNewDetail = new EventEmitter();

  logClassCart = '--Product Single UI: ';
  data: string;
  currentID: number;
  currentService: serviceEntity = new serviceEntity();
  selectedBMDate : string;
  displayDate : string;
  selectedMessage: string;
  listBookingDetail : BookingDetailEntity[] = [];
    listBookingChange: EventEmitter<BookingDetailEntity[]> = new EventEmitter();
    acceptTobook: boolean;
//servicart-end
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private serviceManageService: ServiceManageService,
    private location : Location
  ) { }

  ngOnInit() {

    this.getServiceList();
    this.getCurrentUserID();
    this.UserDetail();
    // this.createBookingMaster();
    this.getListPet();
    this.getMyListPet();
    this.checkLocalStorage();
    }
    checkLocalStorage() : void {
      console.log("local length: " + localStorage.listBookingDetail)
      if(localStorage.listBookingDetail == '' || localStorage.listBookingDetail == null)
      {
        this.acceptTobook =  false;
      }else{
        this.acceptTobook = true;
      }
    }
 // insert a booking-detail to cart
 getDataFromLocalStorage():void {
   this.data = localStorage.getItem('listBookingDetail');
   if (this.data != '' && this.data != null){
     console.log(this.logClass + " Get data from Local Storage");
     this.listBookingDetail = JSON.parse(this.data);
     console.log(this.listBookingDetail + "bbbb" )
   }
 }
 saveToLocalStorage():void {
   localStorage.setItem('listBookingDetail', JSON.stringify(this.listBookingDetail));
 }
 clearLocalStorage():void {
   localStorage.setItem('listBookingDetail', '');
 }

 // addcart(BDcart: BookingDetailEntity): void {
 //
 //   this.createBooking(BDcart);
 //
 // }
 getListBookingDetail(): BookingDetailEntity[] {
   this.getDataFromLocalStorage();
   console.log(this.logClass + 'get List Booking: ' + this.listBookingDetail.length);
   return this.listBookingDetail;
 }

//cart end
    setSelectedService(event: Event): void {
      console.log(JSON.stringify(event));
      this.choosenService = this.listservice.find(ser => JSON.stringify(ser.serID) == JSON.stringify(event));
    }
    setPet(event: Event): void {
      console.log(JSON.stringify(event));
      this.selectedPet = this.myListPet.find(pet => JSON.stringify(pet.petID) == JSON.stringify(event));
    }
    createBooking(): void {
      this.newBm.userEntity = new UserEntity();
      this.newBm.userEntity.userID = this.currentUserID;
      let currentDate = new Date();
      let stringDate = '';
      stringDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(currentDate, 'hh:mm:ss', 'en-US');
      console.log(this.logClass + "date: " + stringDate);
      this.newBm.creDate = stringDate;

      this.addNewBookingMaster(this.newBm).subscribe(
        response => {
          console.log("this booking ID: " + response.bookingID);
          this.currentbmID = response.bookingID;
          this.newBm.bookingID = this.currentbmID;
          this.saveBookingDetail(this.newBm);
          //rối
          this.acceptTobook = false;

        }
      );
    }
    saveBookingDetail(bookingMaster : BookingMasterEntity){
      /// rối chỗ này nè
      this.urlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
      console.log(this.logClass + "post Order Detail: " + this.urlAPI.path);


      this.listBookingDetail.forEach(
        item => {
                    item.bookingMasterEntity = bookingMaster;
                    item.bookingMasterEntity.bookingID = bookingMaster.bookingID;
                    console.log("track booking detail add: " + item.bookingMasterEntity.bookingID);
                    this.postBookingDetail(item);
                }
      );


    }
    postBookingDetail(newBookingDetail: BookingDetailEntity):void{
      this.urlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
      console.log(this.logClass + "post Booking Detail: " + this.urlAPI.path);

      this.http.post<HttpResponse<BookingDetailEntity>>(this.urlAPI.path + "/Post" , newBookingDetail, {observe: 'response'}).subscribe(
        response => {
          if(response.status == 200)
          {
                  console.log("booking ok : " + JSON.stringify(response.body));
                  this.clearLocalStorage();

                  window.location.reload();
          }
        }
      );
        }

    bookservice(newBd = this.booknewService): void {
      this.urlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
      this.http.post<HttpResponse<BookingDetailEntity>>(this.urlAPI.path + '/Post', newBd,{ observe: 'response' }).subscribe(
        response => {
          if(response.status == 200)
          {
           console.log("create booking detail successful");
           console.log("create successful booking detail: " + JSON.stringify(response.body));
          }
        }
      );

    }

    addtoCart(): void {
        this.createNew();

    }


    createNew(): void {

      // this.getDataFromLocalStorage();
      this.booknewService = new BookingDetailEntity();

      this.booknewService.bookingMasterEntity = new BookingMasterEntity();
      this.booknewService.serviceEntity = this.choosenService;
      this.booknewService.petEntity = this.selectedPet;
      this.booknewService.bookingMasterEntity.bookingID = this.currentbmID;
      this.booknewService.bdstatus = this.currentStatus;
      // this.booknewService.serviceEntity.serID = this.selectedService.serID;
      // this.booknewService.petEntity.petID = this.tempID;
      // this.booknewService.bookingDate = this.selectedBMDate;
      this.displayDate = formatDate(this.selectedBMDate, 'hh:mm', 'en-US') + ' on ' + formatDate(this.selectedBMDate, 'dd-MM-yyyy', 'en-US') ;
      let currentDate = this.selectedBMDate;
      let stringDate = '';
      stringDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(currentDate, 'hh:mm:ss', 'en-US');
      console.log(this.logClass + "date: " + stringDate);
      this.booknewService.bookingDate = stringDate;
      this.booknewService.message = this.selectedMessage;
      // this.booknewService.petEntity.petID = this.selectedPet.petID;
      console.log("this is service " + JSON.stringify(this.booknewService));
      this.listBookingDetail.push(this.booknewService);
      this.saveToLocalStorage();
      this.listBookingChange.emit(this.listBookingDetail);
      this.bookNewDetail.emit(this.booknewService);
      this.checkLocalStorage();
      this.bookSuccess = true;
      // this.myForm.def.setText("abc");

    }

    getServiceList(): void{
        this.serviceManageService.getServiceList().subscribe(
        result => {
          this.listservice = result;
          console.log("get service result: " + JSON.stringify(result));
        } );
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
              if(this.myListPet.length == 0)
              {
                console.log("no pet");
                alert("You don't have any Pet. Redirecting to Pet Create");
              setTimeout(() =>
              {
                this.router.navigateByUrl('mainlayout/createPet');
              }, 2000
                );
              }
              //voi moi item trong danh sach Pet minh goi len server lay danh sach Image
              else{this.myListPet.forEach(
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

            }
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

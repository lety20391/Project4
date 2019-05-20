import { Component, OnInit } from '@angular/core';
import { BookingMasterEntity } from '../../booking-module/BookingMasterEntity';
import { BookingDetailEntity } from '../../booking-module/BookingDetailEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  logClass : "MyOrder component";
  currentUserID : number;
  BMurlAPI: UrlAPIEntity;
  BDurlAPI: UrlAPIEntity;
  listBookingMaster: BookingMasterEntity[] = [];
  listBookingDetail: BookingDetailEntity[] = [];
  Show: boolean = true;
  // listBookingMaster: BookingMasterEntity[] = [];
  // listBookingMaster: BookingMasterEntity[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCurrentUserID();
    // this.getListBM();
  }
  getCurrentUserID(): void{
    let tempID = localStorage.getItem('UserID');
    if (tempID != null && tempID != ''){
      this.currentUserID = 0;
      //chuyen tu string ve number
      this.currentUserID = parseInt(tempID);
      console.log("this is user: " + this.currentUserID);
      //get bookingMasterID
      console.log(this.logClass + " init");
      this.BDurlAPI = listUrlAPI.find(url => url.name === 'bookingMasterResource');
      console.log(this.logClass + this.BDurlAPI.path)

      this.http.get<HttpResponse<Object[]>>(this.BDurlAPI.path + "/list/" + this.currentUserID ,  { observe: 'response' })
        .subscribe(
          response => {
            if(response.status == 200)
            {
            this.listBookingMaster = JSON.parse(JSON.stringify(response.body));
            console.log("list booking master: "+ JSON.stringify(this.listBookingMaster));
            //getbookingDetail list of bm
            this.listBookingMaster.forEach(
              item=> {
                this.BMurlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
                console.log(this.logClass + this.BMurlAPI.path)

                this.http.get<HttpResponse<Object[]>>(this.BMurlAPI.path + "/list/" + item.bookingID ,  { observe: 'response' })
                  .subscribe(
                    bmResponse => {
                      if(bmResponse.status == 200){
                    console.log("get list BD from BookingID success");
                    this.listBookingDetail = JSON.parse(JSON.stringify(bmResponse.body));
                    console.log("booking detail list of " + item.bookingID + ": " + JSON.stringify(this.listBookingDetail));
                    }
                  }
                  );
            }) ;
          }
        }
        );
    }
  }
  show(): void {
    this.Show = !this.Show;
  }
}

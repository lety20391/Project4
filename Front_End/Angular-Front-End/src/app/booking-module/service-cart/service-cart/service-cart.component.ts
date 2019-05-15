import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookingDetailEntity} from '../../BookingDetailEntity';
import { BookingComponent} from '../../booking.component';
import { PetEntity} from '../../../pet-module/PetEntity';
@Component({
  selector: 'app-service-cart',
  templateUrl: './service-cart.component.html',
  styleUrls: ['./service-cart.component.css']
})
export class ServiceCartComponent implements OnInit {
  myListPet: PetEntity[] ;
  listBookingDetail: BookingDetailEntity[];
  logClass = '--Shoping cart: ';
  constructor(
    private booking : BookingComponent
  ) { }

  ngOnInit() {
    this.getListBookingDetail();
  }

  getListBookingDetail(): void{
    console.log(this.logClass + "getListOrder()");
    this.listBookingDetail = this.booking.getListBookingDetail();
    console.log("list booking detail: "  + JSON.stringify(this.listBookingDetail));
  }
  TotalBook(): void {
    this.booking.bookservice();
  }

}

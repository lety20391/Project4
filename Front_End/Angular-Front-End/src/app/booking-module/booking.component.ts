import { Component, OnInit } from '@angular/core';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { PetManageService} from '../pet-manage.service';
import { serviceEntity } from '../serviceEntity/serviceEntity';
import { UserEntity } from '../UserEntity/UserEntity';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

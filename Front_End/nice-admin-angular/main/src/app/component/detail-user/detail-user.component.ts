import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/app/ecommerce/Entity/UserEntity';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  // detailedUser: UserEntity = {
  //   UserID: 1,
  //   UserName: 'Dat Le',
  //   UserTel: '0123456789',
  //   UserMail: 'user@gmail.com',
  //   DOB: '20-2-2012',
  //   UserStatus: true
  // };

  constructor() { }

  ngOnInit() {
  }

}

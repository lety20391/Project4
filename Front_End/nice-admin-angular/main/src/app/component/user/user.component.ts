import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/app/ecommerce/Entity/UserEntity';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // listUser: UserEntity[] = [
  //   {
  //     UserID: 1,
  //     UserName: 'Dat Le',
  //     UserTel: '0123456789',
  //     UserMail: 'user@gmail.com',
  //     DOB: '20-2-2012',
  //     UserStatus: true
  //   },
  //   {
  //     UserID: 2,
  //     UserName: 'Duy Tran',
  //     UserTel: '0123456789',
  //     UserMail: 'duy@gmail.com',
  //     DOB: '20-2-2013',
  //     UserStatus: true
  //   },
  //   {
  //     UserID: 2,
  //     UserName: 'Elisa Muoi',
  //     UserTel: '0123456789',
  //     UserMail: 'elisa@gmail.com',
  //     DOB: '20-2-2014',
  //     UserStatus: true
  //   }
  // ];

  constructor() { }

  ngOnInit() {
  }

}

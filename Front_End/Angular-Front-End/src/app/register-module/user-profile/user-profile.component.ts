import { Component, OnInit, Input } from '@angular/core';
import { UserEntity } from 'src/app/UserEntity/UserEntity';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() currentUser: UserEntity = new UserEntity();

  constructor() { }

  ngOnInit() {
    this.initBasicData();
  }

  initBasicData():void{
    this.currentUser = new UserEntity();
    this.currentUser.listUserImage = [];
  }

}

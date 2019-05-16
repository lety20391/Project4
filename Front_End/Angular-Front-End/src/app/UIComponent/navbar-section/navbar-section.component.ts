import { Component, OnInit, Input } from '@angular/core';
import {JWTHeaderService} from '../../jwtheader.service';
@Component({
  selector: 'app-navbar-section',
  templateUrl: './navbar-section.component.html',
  styleUrls: ['./navbar-section.component.css']
})
export class NavbarSectionComponent implements OnInit {

  @Input() amountOfOrderDetail: number;
  isLogin: boolean;
  constructor(
          private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.checkJWT();
  }
  checkJWT(): void {
    let tempJWT = this.jwtService.getJWT();
    if(tempJWT == null || tempJWT == ''){
      this.isLogin = false;
    }else
      this.isLogin = true;
    }
    logOut(): void {
      this.jwtService.cleanJWT();
      window.location.reload();
    }

  }

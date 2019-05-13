import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-section',
  templateUrl: './navbar-section.component.html',
  styleUrls: ['./navbar-section.component.css']
})
export class NavbarSectionComponent implements OnInit {

  @Input() amountOfOrderDetail: number;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import {NgModule} from '@angular/core';
import {NavbarSectionComponent} from '../navbar-section/navbar-section.component';

@NgModule({
  declarations: [
    NavbarSectionComponent
  ]
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() totalOrder: number;
  constructor() { }

  ngOnInit() {
  }

}

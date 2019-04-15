import { Component, OnInit } from '@angular/core';
import { productEntity } from '../productEntity/productEntity';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //this is title and content for small banner
  shopTitle = 'Shop';
  shopContent = "Your pet's health and well-being are our top priority.";

  constructor() { }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import { productEntity } from '../../productEntity/productEntity';

@Component({
  selector: 'app-product-mockup',
  templateUrl: './product-mockup.component.html',
  styleUrls: ['./product-mockup.component.css']
})
export class ProductMockupComponent implements OnInit {

  product: productEntity = {
    id: 1,
    name: 'Cat & Dog carried',
    price: 100,
    image: 'assets/images/dummy-img-600x600.jpg'
  };

  constructor() { }

  ngOnInit() {
  }

}

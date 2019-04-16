import { Component, OnInit } from '@angular/core';
import { productEntity } from '../../productEntity/productEntity';
import { ProductManageService } from '../product-manage.service';


@Component({
  selector: 'app-top-seller',
  templateUrl: './top-seller.component.html',
  styleUrls: ['./top-seller.component.css']
})
export class TopSellerComponent implements OnInit {

  topSellerProduct: productEntity[];

  constructor(
    private service: ProductManageService
  ) { }

  ngOnInit() {
    this.getTopSeller();
  }

  getTopSeller(): void {
    this.service.getProductList().subscribe(
      item => this.topSellerProduct = item.slice(1,4)
    );
  }

}

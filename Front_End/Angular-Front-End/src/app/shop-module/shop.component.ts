import { Component, OnInit } from '@angular/core';
import { productEntity } from '../productEntity/productEntity';
import { ProductManageService } from './product-manage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //this is title and content for small banner
  shopTitle = 'Shop';
  shopContent = "Your pet's health and well-being are our top priority.";
  listProduct: productEntity[];

  constructor(
    private productManageService: ProductManageService

  ) { }

  ngOnInit() {
    this.fetchProduct();
  }

  fetchProduct(): void{
    this.productManageService.getProductList().subscribe(
      listResult => this.listProduct = listResult
    );
  }

}

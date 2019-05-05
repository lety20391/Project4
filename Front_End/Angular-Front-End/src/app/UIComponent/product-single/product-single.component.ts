import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { productEntity } from '../../productEntity/productEntity';
import { ProductManageService } from '../../shop-module/product-manage.service';
import {CategoryEntity} from '../../shop-module/CategoryEntity';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  logClass = '--Product Single UI: ';

  currentID: number;
  currentProduct: productEntity = new productEntity();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductManageService
  ) { }

  ngOnInit() {
    this.getID();
    this.getProductByID(this.currentID);

  }

  getID(): void{
    this.currentID = +this.route.snapshot.paramMap.get('id');
    this.currentProduct.cateEntity = new CategoryEntity();
  }

  getProductByID(id: number): void{
    console.log('---Fetch Pet Detail: ' + id);
    this.productService.getProductByID(id).subscribe(
      result => {
                  console.log(this.logClass + ' Product load:' + result.ProName);
                  this.currentProduct = result;
                }
    );
  }

}

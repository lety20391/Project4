import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { productEntity } from '../../productEntity/productEntity';
import { ProductManageService } from '../../shop-module/product-manage.service';
import {CategoryEntity} from '../../shop-module/CategoryEntity';
import {OrderProductService} from '../../order-product.service';
import {OrderDetail} from '../../cart-module/OrderDetail';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  logClass = '--Product Single UI: ';

  currentID: number;
  currentProduct: productEntity = new productEntity();
  listImage: string[];

  @Output() buyNewProduct = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductManageService,
    private orderProduct: OrderProductService
  ) { }

  ngOnInit() {
    this.getID();
    this.getProductByID(this.currentID);
    //this.getAllProductImage(this.currentID);

  }

  getID(): void{
    this.currentID = +this.route.snapshot.paramMap.get('id');
    this.currentProduct.cateEntity = new CategoryEntity();
  }

  getProductByID(id: number): void{
    console.log('---Fetch Pet Detail: ' + id);
    this.productService.getProductByID(id).subscribe(
      result => {
                  console.log(this.logClass + ' Product load:' + result.proName);
                  this.currentProduct = result;
                  this.getAllProductImage(this.currentID);
                }
    );
  }

  getAllProductImage(id: number): void{
    console.log(this.logClass + " Get All Image");
    this.productService.getAllProductImage(id).subscribe(
      result => {
                  console.log(this.logClass + ' Image Load');
                  this.listImage = result;
                  this.currentProduct.proListImage = result;
                }
    );
  }

  buyProduct(selectedProduct: productEntity){
    this.orderProduct.addNewProduct(selectedProduct, true);
    this.buyNewProduct.emit(selectedProduct);
  }

  getComponentType(): string{
    return 'ProductSingleComponent';
  }

}

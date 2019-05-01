import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { productEntity } from '../../productEntity/productEntity';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  detailedProduct: productEntity = {
    ProID: 1,
    ProName: 'Product2',
    ProDes: 'Product1 Description',
    ProPrice: 12,
    ProColor: 'red',
    ProImage: '',
    Status: true,
    Cate_ID: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getID();
  }

  getID(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('---Fetch Pet Detail: ' + id);
  }

}

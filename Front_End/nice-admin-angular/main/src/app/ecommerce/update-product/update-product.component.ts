import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductEntity } from '../product/ProductEntity';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

    hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };
  // detailedProduct: ProductEntity = {
  //       ProID: 1,
  //       ProName: 'Product2',
  //       ProDes: 'Product1 Description',
  //       ProPrice: 12,
  //       ProColor: 'red',
  //       ProImage: '',
  //       Status: true,
  //       cateEntity: {
  //                   CateID: 1,
  //                   CateName: 'CateGory1'
  //                 }
  //   };

  constructor(
              private route: ActivatedRoute,
              private location: Location
              ) { }

  ngOnInit() {
          this.getID();
          }

getID(): void{
          const id = +this.route.snapshot.paramMap.get('id');
          console.log('---Fetch product update: ' + id);
        }
}

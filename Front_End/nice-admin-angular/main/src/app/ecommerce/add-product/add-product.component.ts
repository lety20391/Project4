import { Component, OnInit } from '@angular/core';
import {ProductEntity} from '../product/ProductEntity';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  detailedProduct: ProductEntity = {
        ProID: 1,
        ProName: 'Product2',
        ProDes: 'Product1 Description',
        ProPrice: 12,
        ProColor: 'red',
        ProImage: '',
        Status: true,
        cateEntity: {
                    CateID: 1,
                    CateName: 'CateGory1'
                  }
    };

  constructor() { }

  ngOnInit() {
  }

}

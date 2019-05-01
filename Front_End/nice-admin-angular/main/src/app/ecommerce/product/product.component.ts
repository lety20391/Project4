import { Component } from '@angular/core';
import { ProductEntity } from './ProductEntity';

@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent {

  listProduct: productEntity[] = [
    {
      ProID: 1,
      ProName: 'Pro1',
      ProDes: 'Product1 Description',
      ProPrice: 12,
      ProColor: 'red',
      ProImage: '',
      Status: true,
      cateEntity: {
                    CateID: 1,
                    CateName: 'Category1'
                  }
    },
    {
      ProID: 2,
      ProName: 'Pro2',
      ProDes: 'Product2 Description',
      ProPrice: 24,
      ProColor: 'shit',
      ProImage: '',
      Status: true,
      cateEntity: {
                    CateID: 2,
                    CateName: 'Category2'
                  }
    }
  ];

}

import { Component } from '@angular/core';
import { ProductEntity } from './ProductEntity';
// import * as tableData from '../../table/smart-table/smart-data-table';
// import { LocalDataSource } from 'ng2-smart-table';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {ProductServiceService} from '../product-service.service'

@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent {

  // listProduct: ProductEntity[] = [
  //   {
  //     proID: 1,
  //     proName: 'pink belt',
  //     proDes: 'real leather',
  //     proPrice: 12,
  //     proColor: 'red',
  //     proImage: '',
  //     status: true,
  //     cateEntity: {
  //                   CateID: 1,
  //                   CateName: 'Category1'
  //                 },
  //     proListImage: []
  //
  //   },
  //   {
  //     proID: 2,
  //     proName: 'def',
  //     proDes: 'real leather',
  //     proPrice: 24,
  //     proColor: 'yellow',
  //     proImage: '',
  //     status: true,
  //     cateEntity: {
  //                   CateID: 2,
  //                   CateName: 'Category2'
  //                 },
  //     proListImage: []
  //   }
  // ];

  // source: LocalDataSource;
  // source2: LocalDataSource;
  // constructor() {
  //   this.source = new LocalDataSource(tableData.data); // create the source
  //   this.source2 = new LocalDataSource(tableData.data); // create the source
  // }
  // settings = tableData.settings;
  // settings2 = tableData.settings2;
  settings = {
              columns: {
                    proID: {
                      title: 'ID'
                    },
                    proName: {
                      title: 'Pro Name'
                    },
                    proDes: {
                      title: 'Pro Des'
                    },
                    proPrice: {
                      title: 'Pro Price'
                    }
                  }
            };
  listProduct: ProductEntity[] = [];

  constructor(
    private productService: ProductServiceService
  ) { }

  ngOnInit() {
    this.getAllProductList();
  }

  getAllProductList(): void{
    this.listProduct = this.productService.getProductList();
  }

}

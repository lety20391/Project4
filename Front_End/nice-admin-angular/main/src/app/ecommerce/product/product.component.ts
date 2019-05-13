import { Component } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import {ProductEntity} from './ProductEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
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
                  },
                  edit: {confirmSave: true,},
                  mode: 'inline'
            };
  listProduct: ProductEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Product Component: ';
  tempProduct: ProductEntity = new ProductEntity();

  constructor(
    private productService: ProductServiceService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllProductList();
  }

  getAllProductList(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
      console.log(this.logClass + this.urlAPI.path)

      this.http.get<HttpResponse<ProductEntity[]>>(this.urlAPI.path + "/list",  { observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listProduct = JSON.parse(JSON.stringify(response.body));

              }
              // if (response.status == 200){
              //   this.isLogined = true;
              //   console.log( response.headers.get('Authorization') );
              //   let auth = response.headers.get('Authorization');
              //   this.jwtService.addJWT(auth);
              //   console.log('Get jwt: ' + this.jwtService.getJWT());
              // }else{
              //   this.pass = 'Please Enter Code Again';
              // }

            }
      );
  }

  selectedRow(event: any): void{
    console.log(this.logClass + ' selected Row:' + JSON.stringify(event.data));
  }

  updateRow(event: any): void{
    this.tempProduct = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' updated Product' + JSON.stringify(this.tempProduct));

    //update Local listProduct
    event.confirm.resolve(event.newData);

    //update Database
    this.http.put<HttpResponse<ProductEntity[]>>(this.urlAPI.path , event.newData ,{ observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));

            }
            // if (response.status == 200){
            //   this.isLogined = true;
            //   console.log( response.headers.get('Authorization') );
            //   let auth = response.headers.get('Authorization');
            //   this.jwtService.addJWT(auth);
            //   console.log('Get jwt: ' + this.jwtService.getJWT());
            // }else{
            //   this.pass = 'Please Enter Code Again';
            // }

          }
    );

  }

}

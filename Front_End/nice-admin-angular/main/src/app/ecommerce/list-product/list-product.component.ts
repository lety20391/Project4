import { Component, OnInit } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import { ProductEntity } from '../product/ProductEntity';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  listProduct: ProductEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--List Product Component: ';

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

  constructor(
    private http: HttpClient,
    private productService: ProductServiceService
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

                //lay du lieu Image tu server
                this.listProduct.forEach(
                  item => {
                    this.productService.getAllProductImage(item.proID)
                      .subscribe(
                        result => {
                          item.proListImage = JSON.parse(JSON.stringify(result));
                        }
                      );

                  }
                );

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

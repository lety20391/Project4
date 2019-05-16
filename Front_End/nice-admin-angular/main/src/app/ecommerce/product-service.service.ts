import { Injectable } from '@angular/core';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import {ProductEntity} from './product/ProductEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  urlAPI: UrlAPIEntity;
  logClass = '--Product Service: ';
  listProduct: ProductEntity[];

  constructor(
    private http: HttpClient
  ) { }

  getProductList(): ProductEntity[]{
    this.getProductListFromServer();
    return this.listProduct;
  }

  getProductListFromServer(): void{
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
}
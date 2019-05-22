import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import { ProductEntity } from '../Entity/ProductEntity';


@Component({
  templateUrl: 'details.component.html'
})

export class DetailsComponent {

      // detailedProduct: ProductEntity = {
      //       ProID: 1,
      //       ProName: 'Pink leather',
      //       ProDes: 'real leather',
      //       ProPrice: 12,
      //       ProColor: 'pink',
      //       ProImage: '',
      //       Status: true,
      //       cateEntity: {
      //                   CateID: 1,
      //                   CateName: 'CateGory1'
      //                 }
      //   };
      currentProductID: number;
      urlAPI: UrlAPIEntity;
      logClass = '--Detail Product Component: ';
      currentProduct: ProductEntity = new ProductEntity();
      isShowProduct: boolean = false;
      listInfo: string [] = [];

      constructor(
                  private route: ActivatedRoute,
                  private location: Location,
                  private http: HttpClient,
                  private productService: ProductServiceService
                  ) { }

      ngOnInit() {
              this.getID();
              this.getProductByID(this.currentProductID);
              }

    getID(): void{
              this.currentProductID = +this.route.snapshot.paramMap.get('id');
              console.log('---Fetch product Detail: ' + this.currentProductID);
            }

    getProductByID(id: number): void{
      console.log(this.logClass + " init");
        this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
        console.log(this.logClass + this.urlAPI.path)

        this.http.get<HttpResponse<ProductEntity[]>>(this.urlAPI.path + '/getDetail/findID/' + id,  { observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  this.currentProduct = JSON.parse(JSON.stringify(response.body));

                  this.productService.getAllProductImage(this.currentProduct.proID)
                    .subscribe(
                            response => {
                              this.currentProduct.proListImage = JSON.parse(JSON.stringify(response));

                              if(this.currentProduct.proDes.includes('.')){
                                  this.listInfo = this.currentProduct.proDes.split('.');
                              }else if ( this.currentProduct.proDes.includes(',') ){
                                  this.listInfo = this.currentProduct.proDes.split(',');
                              }else if ( this.currentProduct.proDes.includes(':')){
                                  this.listInfo = this.currentProduct.proDes.split(':');
                              }
                              this.isShowProduct = true;
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

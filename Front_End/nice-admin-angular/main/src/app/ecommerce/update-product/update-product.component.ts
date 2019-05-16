import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import { ProductEntity } from '../product/ProductEntity';
import { CategoryEntity } from '../cate/CategoryEntity';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    // powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
    //
    // hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };
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

  currentProductID: number;
  urlAPI: UrlAPIEntity;
  logClass = '--Update Product Component: ';
  currentProduct: ProductEntity = new ProductEntity();

  constructor(
              private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient,
              private jwtService: JWTHeaderService
              ) { }

  ngOnInit() {
          this.currentProduct.cateEntity = new CategoryEntity();
          this.getID();
          this.getProductByID(this.currentProductID);
          }

getID(): void{
          this.currentProductID = +this.route.snapshot.paramMap.get('id');
          console.log('---Fetch product update: ' + this.currentProductID);
        }

  getProductByID(id: number): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
      console.log(this.logClass + this.urlAPI.path)

      //prepare headers
      let headers = this.createHeader();

      this.http.get<HttpResponse<ProductEntity[]>>(this.urlAPI.path + '/getDetail/findID/' + id,  { headers: headers, observe: 'response' })
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

                //*******nho kiem tra va xoa dong nay *****
                this.currentProduct.cateEntity = new CategoryEntity();

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

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }
}

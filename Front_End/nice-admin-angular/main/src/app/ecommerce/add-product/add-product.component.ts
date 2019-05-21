import { Component, OnInit } from '@angular/core';

import { ProductEntity } from '../Entity/ProductEntity';
import { CategoryEntity } from '../Entity/CategoryEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {JWTHeaderService} from '../../jwtheader.service';
import { ImageServiceService } from '../image-service.service';
import { DatePipe, formatDate } from '@angular/common';
import { UserEntity } from '../Entity/UserEntity';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { UploadAdapter } from '../UploadAdapter/upload-adapter';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  adapter: UploadAdapter;
  isReadyToUploadImage: boolean = false;
  newProduct: ProductEntity = new ProductEntity();
  urlAPI: UrlAPIEntity;
  logClass = '--List Pet Component: ';
  UrlEntity: UrlAPIEntity;
  uploadUrl: string = '';
  listCategory: CategoryEntity[] = [];
  choosenCategory: CategoryEntity;
  cateTemp: number;



  constructor(
    private http: HttpClient,
    private imageService: ImageServiceService,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    // this.loadScript('./assets/js/cropper.js');
    //this.prepareDate();
    this.getAllCategory();
    this.initData();
  }

  initData():void{
    this.newProduct.cateEntity = new CategoryEntity();
    this.newProduct.cateEntity.cateID = 1;
  }

  //load external js file into component
  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }

  getAllCategory(): void{
    console.log(this.logClass + ' get All Category');
    //prepare Url
    this.urlAPI = listUrlAPI.find(url => url.name === 'categoryResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    this.http.get<CategoryEntity[]>(this.urlAPI.path + '/list', { headers: headers})
      .subscribe(
              //day la doan lay Response tra ve
              response => {
                            console.log('HTTP response', response);
                            this.listCategory = response;
                          },

              //day la doan bi loi
              err => {
                console.log('HTTP Error', err.status);
                console.log('ABCxyz');
              },

              //day la doan mac dinh
              () => console.log('HTTP request completed.')
      );
  }

  createProductInfo(): void{
    console.log(this.logClass + " add Pet()");
    console.log(this.logClass + this.newProduct.proName);


    this.newProduct.cateEntity = new CategoryEntity();
    this.newProduct.cateEntity = this.choosenCategory;
    console.log(this.logClass + ' cateEntity: ' + JSON.stringify(this.newProduct.cateEntity));

    //prepare Url
    this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    this.http.post<ProductEntity>(this.urlAPI.path , this.newProduct, { headers: headers}).subscribe(
      //day la doan lay Response tra ve
      response => {
                    console.log('HTTP response', response);
                    let returnProduct = response;
                    if (returnProduct.proID != null){
                      // this.getUrl(returnPet.petID);
                      this.isReadyToUploadImage = true;
                      //prepare Url
                      this.urlAPI = listUrlAPI.find(url => url.name === 'uploadResource');
                      this.urlAPI.path += "/file/" + "Product/" + returnProduct.proID;
                      console.log(this.logClass + this.urlAPI.path);

                      this.adapter = new UploadAdapter(this.http, this.urlAPI.path );
                    }
                  },

      //day la doan bi loi
      err => {
        console.log('HTTP Error', err.status);
        console.log('ABCxyz');
      },

      //day la doan mac dinh
      () => console.log('HTTP request completed.')
    );
  }

  setSelectedCategory(event : Event): void{
      this.choosenCategory = this.listCategory.find( cate => JSON.stringify(cate.cateID) == JSON.stringify(event));
      console.log(this.logClass + ' choosen Category:' + JSON.stringify(this.choosenCategory));
  }

  // getUrl(code: number): void{
  //   //code will be use to create image Folder on server
  //   console.log("------Create Pet: getUrl() ------");
  //
  //   //change your url name here
  //   this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
  //   this.uploadUrl = this.UrlEntity.path + "/file/" + "Pet/" + code;
  //   console.log(this.uploadUrl);
  // }

  oneFileUploadSuccess(event: any): void{
    alert('**File: ' + JSON.stringify(event.fileName) + ' UPLOAD SUCCESSFULLY**');
  }

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }


}

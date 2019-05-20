import { Component, OnInit } from '@angular/core';
import { productEntity } from '../productEntity/productEntity';
import { ProductManageService } from './product-manage.service';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { HttpClient } from '@angular/common/http';
import { TopsellerComponent} from './top-seller/top-seller.component';
import { CategoryEntity } from './CategoryEntity';

import { Options, LabelType } from 'ng5-slider';
// import { GalleryComponent } from '../UIComponent/gallery/gallery.component';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  minValue: number = 10;
  maxValue: number = 30;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  //this is title and content for small banner
  shopTitle = 'Shop';
  shopContent = "Your pet's health and well-being are our top priority.";
  listProduct: productEntity[];
  logClass = '--Shop component: ';
  urlAPI: UrlAPIEntity;
  listCate: CategoryEntity[] = [];

  searchNameProduct: string = '';

  constructor(
    private productManageService: ProductManageService,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.fetchProduct();
    this.loadScript('./assets/js/search.js');
  }

  loadCate(): void {

    // this.gallery.getCate().subscribe(
    //   result =>
    //   {
    //     this.listCate = result;
    //   }
    // );
  }

  fetchProduct(): void{
    this.productManageService.getProductList().subscribe(
      listResult => {
        this.listProduct = listResult;
        this.listProduct.forEach(
              item => {
                //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
                item.proListImage = [];
                console.log(this.logClass + " getImagePath");
                this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                console.log(this.logClass + this.urlAPI.path);

                //goi len server de lay danh sach hinh anh ve
                this.http.get<string[]>(this.urlAPI.path + '/Product/' + item.proID)
                .subscribe(
                  result => {
                              console.log(this.logClass + ' Image Load:' + result);
                              //gan ket qua tra ve vao thuoc tinh petListImage
                              item.proListImage = result;
                            }
                );
              }
        );
      }
    );
  }

    //load external js file into component
    public loadScript(url: string) {
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    }

  getProductByCate(event: Event): void {
    let id = Number(event);
    console.log("this is ID: " +id)
    this.productManageService.getProductByCate(id).subscribe(
      resultList => {
        this.listProduct = resultList;
        // console.log("list: "+ this.listProduct);
        this.listProduct.forEach(
              item => {
                //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
                item.proListImage = [];
                console.log(this.logClass + " getImagePath");
                this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                console.log(this.logClass + this.urlAPI.path);

                //goi len server de lay danh sach hinh anh ve
                this.http.get<string[]>(this.urlAPI.path + '/Product/' + item.proID)
                .subscribe(
                  result => {
                              console.log(this.logClass + ' Image Load:' + result);
                              //gan ket qua tra ve vao thuoc tinh petListImage
                              item.proListImage = result;
                            }
                );
              }
        );
      }
    );
  }

  searchProduct(): void{
    console.log(this.logClass + ' get my list Pet');
    this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');

    this.http.get<productEntity[]>(this.urlAPI.path + '/Search/' + this.searchNameProduct)
        .subscribe(
              response => {
                    this.listProduct = JSON.parse(JSON.stringify(response));
                    this.listProduct.forEach(
                            item => {
                                  item.proListImage = [];
                                  console.log(this.logClass + " getImagePath");
                                  this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                                  console.log(this.logClass + this.urlAPI.path);

                                  //goi len server de lay danh sach hinh anh ve
                                  this.http.get<string[]>(this.urlAPI.path + '/Product/' + item.proID)
                                  .subscribe(
                                    result => {
                                                console.log(this.logClass + ' Image Load:' + result);
                                                //gan ket qua tra ve vao thuoc tinh petListImage
                                                item.proListImage = result;
                                              }
                                  );
                            }
                    );
              }
        );
  }

  filterProductByPrice(): void{
    console.log(this.logClass + ' filter Product By Price');
    this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');

    this.http.get<productEntity[]>(this.urlAPI.path + '/Filter/' + this.minValue + '/' + this.maxValue)
        .subscribe(
              response => {
                    this.listProduct = JSON.parse(JSON.stringify(response));
                    this.listProduct.forEach(
                            item => {
                                  item.proListImage = [];
                                  console.log(this.logClass + " getImagePath");
                                  this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                                  console.log(this.logClass + this.urlAPI.path);

                                  //goi len server de lay danh sach hinh anh ve
                                  this.http.get<string[]>(this.urlAPI.path + '/Product/' + item.proID)
                                  .subscribe(
                                    result => {
                                                console.log(this.logClass + ' Image Load:' + result);
                                                //gan ket qua tra ve vao thuoc tinh petListImage
                                                item.proListImage = result;
                                              }
                                  );
                            }
                    );
              }
        );
  }
}

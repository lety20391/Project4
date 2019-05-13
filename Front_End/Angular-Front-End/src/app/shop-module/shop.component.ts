import { Component, OnInit } from '@angular/core';
import { productEntity } from '../productEntity/productEntity';
import { ProductManageService } from './product-manage.service';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { HttpClient } from '@angular/common/http';
import { TopsellerComponent} from './top-seller/top-seller.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //this is title and content for small banner
  shopTitle = 'Shop';
  shopContent = "Your pet's health and well-being are our top priority.";
  listProduct: productEntity[];
  logClass = '--Shop component: ';
  urlAPI: UrlAPIEntity;

  constructor(
    private productManageService: ProductManageService,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.fetchProduct();
    this.loadScript('./assets/js/search.js');
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

}

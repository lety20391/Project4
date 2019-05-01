import { Component, OnInit } from '@angular/core';
import { productEntity } from '../productEntity/productEntity';
import { ProductManageService } from './product-manage.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //this is title and content for small banner
  shopTitle = 'Shop';
  shopContent = "Your pet's health and well-being are our top priority.";
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

  constructor(
    private productManageService: ProductManageService

  ) { }

  ngOnInit() {
    this.fetchProduct();
    this.loadScript('./assets/js/search.js');
  }

  fetchProduct(): void{
    this.productManageService.getProductList().subscribe(
      listResult => this.listProduct = listResult
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

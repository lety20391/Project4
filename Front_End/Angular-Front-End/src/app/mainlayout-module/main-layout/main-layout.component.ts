import { Component, OnInit } from '@angular/core';
import {OrderProductService} from '../../order-product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  totalFromOrderService: number;
  totalOrder: number = 0;

  constructor(
    private orderService: OrderProductService
  ) { }

  ngOnInit() {
    this.loadScript('./assets/js/vendor/jquery.min.js');
    this.loadScript('./assets/js/vendor/jquery.magnific-popup.min.js');
    this.loadScript('./assets/js/vendor/bootstrap.min.js');
    this.loadScript('./assets/js/vendor/modernizr.min.js');
    this.loadScript('./assets/js/vendor/owl.carousel.js');
    this.loadScript('./assets/js/vendor/validator.min.js');
    this.loadScript('./assets/js/vendor/form-scripts.js');
    this.loadScript('./assets/js/script.js');
    this.getTotalQuantityFromOrder();
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

  getTotalQuantityFromOrder(): void{
    this.totalFromOrderService = this.orderService.getTotalQuantity();
  }

  componentAddedToOutlet(component: any ){
    console.log(component);
    console.log('  Test ID: ' + component.getTest());
    component.buyNewProduct.subscribe(
      item => {
        console.log('Item: ' + JSON.stringify(item));
        console.log('***Buy New***');
        this.totalOrder += 1;
      }
    );
  }

}

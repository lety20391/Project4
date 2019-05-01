import { Component, OnInit } from '@angular/core';
import { productEntity } from '../../productEntity/productEntity';
import { OrderDetail } from '../OrderDetail';
@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

//demo
  listProduct: productEntity[] = [
    {
    ProID: 1,
    ProName: 'Pro1',
    ProDes: 'Pet Champion is a well-respected name in dog ties and cables, and this model is no exception. 30-feet of strong, but lightweight steel and vinyl-covered cable, this tie out gives your dog the freedom they’re looking for without getting too twisted',
    ProPrice: 20,
    ProColor: 'Red',
    ProImage: '',
    Status: true,
    Cate_ID: 1, },
    {
    ProID: 2,
    ProName: 'Pro2',
    ProDes: 'Pet Champion is a well-respected name in dog ties and cables, and this model is no exception. 30-feet of strong, but lightweight steel and vinyl-covered cable, this tie out gives your dog the freedom they’re looking for without getting too twisted',
    ProPrice: 30,
    ProColor: 'Blue',
    ProImage: '',
    Status: true,
    Cate_ID: 2, }
  ];

    listOrderDetail: OrderDetail [] = [
    { ODetailID: 1,
      Qty: 2,
      OrderDate: '12-12-2019',
      Status: true,
      productEntity: this.listProduct[0],
      OrderID: null
    },
    { ODetailID: 2,
      Qty: 3,
      OrderDate: '12-12-2019',
      Status: true,
      productEntity: this.listProduct[1],
      OrderID: null
    }
    ];

  constructor() { }

  ngOnInit() {
  }

}

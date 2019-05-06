import { Component, OnInit } from '@angular/core';
import { productEntity } from '../../productEntity/productEntity';
import { OrderDetail } from '../OrderDetail';
import { OrderMaster } from '../OrderMaster';
import {OrderProductService} from '../../order-product.service';
import {UserEntity} from '../../UserEntity/UserEntity';
@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

//demo
  // listProduct: productEntity[] = [
  //   {
  //   ProID: 1,
  //   ProName: 'Pro1',
  //   ProDes: 'Pet Champion is a well-respected name in dog ties and cables, and this model is no exception. 30-feet of strong, but lightweight steel and vinyl-covered cable, this tie out gives your dog the freedom they’re looking for without getting too twisted',
  //   ProPrice: 20,
  //   ProColor: 'Red',
  //   ProImage: '',
  //   Status: true,
  //   cateEntity: {
  //               CateID: 1,
  //               CateName: 'Cat2',
  //               }
  // },
  //   {
  //   ProID: 2,
  //   ProName: 'Pro2',
  //   ProDes: 'Pet Champion is a well-respected name in dog ties and cables, and this model is no exception. 30-feet of strong, but lightweight steel and vinyl-covered cable, this tie out gives your dog the freedom they’re looking for without getting too twisted',
  //   ProPrice: 30,
  //   ProColor: 'Blue',
  //   ProImage: '',
  //   Status: true,
  //   cateEntity: {
  //               CateID: 2,
  //               CateName: 'Cat1',
  //               }
  //    }
  // ];
  //
  //   listOrderDetail2: OrderDetail [] = [
  //   { ODetailID: 1,
  //     Qty: 2,
  //     OrderDate: '12-12-2019',
  //     Status: true,
  //     productEntity: this.listProduct[0],
  //     OrderID: null
  //   },
  //   { ODetailID: 2,
  //     Qty: 3,
  //     OrderDate: '12-12-2019',
  //     Status: true,
  //     productEntity: this.listProduct[1],
  //     OrderID: null
  //   }
  //   ];

    listOrderDetail: OrderDetail[];
    logClass = '--Shoping cart: ';
    subTotal = 0;
    vat = 0.1;

  constructor(
    public orderProduct: OrderProductService
  ) { }

  ngOnInit() {
    this.getListOrder();
    this.calSubTotal();
  }

  getListOrder(): void{
    console.log(this.logClass + "getListOrder()");
    this.listOrderDetail = this.orderProduct.getListOrderDetail();
  }

  calSubTotal(): void{
    this.listOrderDetail.forEach(
      item => this.subTotal += item.qty * item.productEntity.proPrice
    );
  }

  // checkout(): void{
  //   this.orderProduct.postOrderMaster();
  // }

  checkout(): void{
    let newOrderMaster = new OrderMaster();
    newOrderMaster.creDate = '2019-05-24T05:00:00.000Z';
    newOrderMaster.shipDate = '2019-06-24T05:00:00.000Z';
    newOrderMaster.userEntity = new UserEntity();
    newOrderMaster.userEntity.userID = 1;

    this.orderProduct.postOrderMaster(newOrderMaster).subscribe(
      response => {
                    console.log('--New Order Master: ' + response.orderID);
                    //sau khi tao xong thi OrderMaster se co ID, lay ID gan vao
                    //de lam foreign key cho OrderDetail
                    newOrderMaster.orderID = response.orderID;
                    //cap nhap lai Quantity lan cuoi truoc khi Send len server
                    this.getListOrder();
                    this.saveOrderDetail(response.orderID);
                  }
    );





  }

  saveOrderDetail(id: number): void{
    this.listOrderDetail.forEach(
      item => {
                console.log('---Check Quantity: ' + item.qty);
                item.orderDate = '2019-05-24T05:00:00.000Z';
                item.orderMaster = new OrderMaster();
                item.orderMaster.orderID = id;
                this.orderProduct.postOrderDetail(item).subscribe(
                  response => {
                    console.log('---New Order Detail: ' + response.oDetailID);
                    console.log('---Them message vao day--');
                  }
                );
              }
    );
  }

}

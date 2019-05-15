import { Component, OnInit } from '@angular/core';
import { productEntity } from '../../productEntity/productEntity';
import { OrderDetail } from '../OrderDetail';
import { OrderMaster } from '../OrderMaster';
import {OrderProductService} from '../../order-product.service';
import {UserEntity} from '../../UserEntity/UserEntity';
import {UrlAPIEntity} from '../../UrlAPIEntity';
import {listUrlAPI} from '../../listUrlAPI';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {throwError} from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';

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
    urlAPI: UrlAPIEntity;

  constructor(
    public orderProduct: OrderProductService,
    private http: HttpClient
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


    newOrderMaster.creDate = this.getCurrentDateTime();
    newOrderMaster.shipDate = '2019-06-24T05:00:00.000Z';
    //newOrderMaster.orderID = 2;
    newOrderMaster.userEntity = new UserEntity();
    newOrderMaster.userEntity.userID = 1;


    let url = listUrlAPI.find(url => url.name === 'orderMasterResource');
    console.log(this.logClass + url.path);
    console.log(this.logClass + ' post OrderMaster ' + newOrderMaster.creDate);
    this.http.post<OrderMaster>(url.path, newOrderMaster, {observe: 'response'})
      .subscribe(
            //day la doan lay Response tra ve
            response => {
                          console.log('HTTP response', response.status);
                          console.log('checkout OrderMaster: ' + response.body.orderID);
                          newOrderMaster.orderID = response.body.orderID;
                          this.saveOrderDetail(newOrderMaster);


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

  saveOrderDetail(orderMaster: OrderMaster): void{
    //prepare Url to post data
    this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
    console.log(this.logClass + "post Order Detail: " + this.urlAPI.path);

    this.listOrderDetail.forEach(
      item => {
                console.log('---Check Quantity: ' + item.qty);
                item.orderDate = this.getCurrentDateTime();
                item.orderMasterEntity = orderMaster;
                item.orderMasterEntity.userEntity = new UserEntity();

                this.orderProduct.postOrderDetail(item).subscribe(
                  response => {
                    console.log('---New Order Detail: ' + response.oDetailID);
                    console.log('---Them message vao day--');
                  }
                );



                // return this.http.post<OrderDetail>(this.urlAPI.path, newOrderDetail);
              }
    );
  }

  getCurrentDateTime(): string{
    //getCurrent DateTime - test
    let currentDate = new Date();
    let stringDate = '';
    stringDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(currentDate, 'hh:mm:ss', 'en-US');

    console.log(this.logClass + "date: " + stringDate);
    return stringDate;
  }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    };

}

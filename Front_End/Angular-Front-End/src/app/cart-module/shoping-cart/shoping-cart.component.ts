import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { Router } from '@angular/router';
import {JWTHeaderService} from '../../jwtheader.service';

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
    @Output() buyNewProduct = new EventEmitter();
    currentUser: UserEntity = new UserEntity();
    newOrderMaster: OrderMaster = new OrderMaster();

    // Min moment: Today + 2 day
    public minDate : Date;

    // Max moment: Today + 30 day
    public maxDate : Date;


  constructor(
    public orderProduct: OrderProductService,
    private http: HttpClient,
    private route: Router,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.checkJWT();
    this.prepareDate();
    this.getCurrentUser();
    this.getListOrder();
    this.calSubTotal();
  }

  //check JWT de kiem tra login so bo
  checkJWT(): void{
    let tempJWT = this.jwtService.getJWT();
    if(tempJWT == null || tempJWT == '')
      this.route.navigate(['/mainlayout/login']);
  }

  prepareDate(): void{
    //ngay min la 2 ngay sau ngay hom nay moi bat dau ship hang
    //ngay max la 30 ngay sau ngay hom nay

    let tempDateInSecond = new Date().getTime();
    //cong them 2 ngay ( 2 * 24 * 3600) vao tempDate hien tai
    tempDateInSecond += 2 * 24 * 3600 * 1000;
    this.minDate = new Date(tempDateInSecond);

    tempDateInSecond = new Date().getTime();
    //cong them 30 ngay ( 30 * 24 * 3600) vao tempDate hien tai
    tempDateInSecond += 30 * 24 * 3600 * 1000;
    this.maxDate = new Date(tempDateInSecond);


  }

  getCurrentUser(): void{
    let ID = localStorage.getItem('UserID');
    if (ID != null && ID != ''){
      console.log(this.logClass + ' get Current User');

      //change your url name here
      this.urlAPI = listUrlAPI.find(url => url.name === 'userDetailResource');
      this.http.get<UserEntity[]>(this.urlAPI.path + '/' + ID )
        .subscribe(
          result => {
            this.currentUser = JSON.parse(JSON.stringify(result));
          }
        );
    }
  }



  getListOrder(): void{
    console.log(this.logClass + "getListOrder()");
    this.listOrderDetail = this.orderProduct.getListOrderDetail();
  }

  calSubTotal(): void{
    this.subTotal = 0;
    this.listOrderDetail.forEach(
      item => this.subTotal += item.qty * item.productEntity.proPrice
    );
  }

  // checkout(): void{
  //   this.orderProduct.postOrderMaster();
  // }

  checkout(): void{
    //this.newOrderMaster = new OrderMaster();

    this.newOrderMaster.creDate = this.getCurrentDateTime();
    //newOrderMaster.orderID = 2;
    this.newOrderMaster.userEntity = this.currentUser;


    let url = listUrlAPI.find(url => url.name === 'orderMasterResource');
    console.log(this.logClass + url.path);
    console.log(this.logClass + ' post OrderMaster ' + this.newOrderMaster.creDate);
    this.http.post<OrderMaster>(url.path, this.newOrderMaster, {observe: 'response'})
      .subscribe(
            //day la doan lay Response tra ve
            response => {
                          console.log('HTTP response', response.status);
                          console.log('checkout OrderMaster: ' + response.body.orderID);
                          this.newOrderMaster.orderID = response.body.orderID;
                          this.saveOrderDetail(this.newOrderMaster);


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

  changeProductQty(changedOrderDetail: OrderDetail, isAdded: boolean): void{
    this.orderProduct.addNewProduct(changedOrderDetail.productEntity, isAdded);
    //tinh toan lai table Detail
    this.getListOrder();
    this.calSubTotal();

    //send thay doi toi mainlayout de thay doi cart menu
    this.buyNewProduct.emit();

  }

  removeProduct(removedOrderDetail: OrderDetail): void{
    this.orderProduct.removeProduct(removedOrderDetail.productEntity);

    //tinh toan lai table Detail
    this.getListOrder();
    this.calSubTotal();

    //send thay doi toi mainlayout de thay doi cart menu
    this.buyNewProduct.emit();
  }

  getComponentType(): string{
    return 'ShopingCartComponent';
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

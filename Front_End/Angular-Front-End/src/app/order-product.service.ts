import { Injectable } from '@angular/core';
import {productEntity } from './productEntity/productEntity';
import { HttpClient } from '@angular/common/http';
import {OrderDetail} from './cart-module/OrderDetail';
import {OrderMaster} from './cart-module/OrderMaster';
import {UrlAPIEntity} from './UrlAPIEntity';
import {listUrlAPI} from './listUrlAPI';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  logClass = '--Order-Product service: ';
  listOrderDetail: OrderDetail[] =[];
  newOrderDetail: OrderDetail;
  data: string;
  urlAPI: UrlAPIEntity;

  constructor(
    private http: HttpClient
  ) { }

  addNewProduct(orderedProduct: productEntity){
    this.getDataFromLocalStorage();
    if(this.listOrderDetail.length > 0){
      console.log(this.logClass + ' Search in List Order');
      console.log(this.logClass + ' OrderedProductID: ' + orderedProduct.proID);
      let index = this.listOrderDetail.findIndex(item => item.productEntity.proID == orderedProduct.proID);
      console.log(this.logClass + " Index:" + index);
      if(index >= 0){
        this.listOrderDetail[index].qty += 1;
      }else{
        console.log(this.logClass + 'add new Order');
        this.newOrderDetail = new OrderDetail();
        this.newOrderDetail.productEntity = orderedProduct;
        this.newOrderDetail.qty = 1;

        console.log(this.logClass + this.newOrderDetail.productEntity.proName);

        this.listOrderDetail.push(this.newOrderDetail);
      }
    }else{
      console.log(this.logClass + 'add new Order');
      this.newOrderDetail = new OrderDetail();
      this.newOrderDetail.productEntity = orderedProduct;
      this.newOrderDetail.qty = 1;

      console.log(this.logClass + this.newOrderDetail.productEntity.proName);

      this.listOrderDetail.push(this.newOrderDetail);
    }
    console.log(this.logClass + 'List Order Detail qty: ' + this.listOrderDetail.length);

    this.saveToLocalStorage();
  }

  saveToLocalStorage():void {
    localStorage.setItem('listOrder', JSON.stringify(this.listOrderDetail));
  }

  clearLocalStorage():void {
    localStorage.setItem('listOrder', '');
  }

  getDataFromLocalStorage():void {
    this.data = localStorage.getItem('listOrder');
    if (this.data != '' && this.data != null){
      console.log(this.logClass + " Get data from Local Storage");
      this.listOrderDetail = JSON.parse(this.data);
    }
  }

  getListOrderDetail(): OrderDetail[] {
    this.getDataFromLocalStorage();
    console.log(this.logClass + 'get List Order: ' + this.listOrderDetail.length);
    return this.listOrderDetail;
  }

  postOrderDetail(newOrderDetail: OrderDetail): Observable<OrderDetail>{
    this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
    console.log(this.logClass + "post Order Detail: " + this.urlAPI.path);

    return this.http.post<OrderDetail>(this.urlAPI.path, newOrderDetail);
  }

  // postOrderMaster():void {
  //   console.log(this.logClass + " init")
  //   let url = listUrlAPI.find(url => url.name === 'orderMasterResource');
  //   let newOrderMaster = new OrderMaster();
  //   newOrderMaster.CreDate = '2019-5-6';
  //   newOrderMaster.ShipDate = '2019-5-7';
  //   newOrderMaster.UserID = 1;
  //   console.log(this.logClass + url.path);
  //   console.log(this.logClass + ' post OrderMaster');
  //   this.http.post<OrderMaster>(url.path, newOrderMaster);
  //
  //   console.log(this.logClass + ' post OrderDetail');
  //   this.listOrderDetail.forEach(
  //     item => {
  //               item.OrderDate = '2019-5-6';
  //               item.OrderMaster = newOrderMaster;
  //               this.postOrderDetail(item);
  //             }
  //   );
  // }
  postOrderMaster(newOrderMaster: OrderMaster): Observable<OrderMaster> {
    console.log(this.logClass + " init")
    let url = listUrlAPI.find(url => url.name === 'orderMasterResource');
    console.log(this.logClass + url.path);
    console.log(this.logClass + ' post OrderMaster ' + newOrderMaster.creDate);
    return this.http.post<OrderMaster>(url.path, newOrderMaster, {})
  }
}

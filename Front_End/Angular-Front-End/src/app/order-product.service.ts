import { Injectable } from '@angular/core';
import {productEntity } from './productEntity/productEntity';
import { HttpClient } from '@angular/common/http';
import {OrderDetail} from './cart-module/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  logClass = '--Order-Product service: ';
  listOrderDetail: OrderDetail[] =[];
  newOrderDetail: OrderDetail;
  data: string;

  constructor() { }

  addNewProduct(orderedProduct: productEntity){
    this.getDataFromLocalStorage();

    this.newOrderDetail = new OrderDetail();
    this.newOrderDetail.productEntity = orderedProduct;
    console.log(this.logClass + this.newOrderDetail.productEntity.ProName);
    
    this.listOrderDetail.push(this.newOrderDetail);
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
    if (this.data != ''){
      console.log(this.logClass + " Get data from Local Storage");
      this.listOrderDetail = JSON.parse(this.data);
    }
  }

  getListOrderDetail(): OrderDetail[] {
    this.getDataFromLocalStorage();
    console.log(this.logClass + 'get List Order: ' + this.listOrderDetail.length);
    return this.listOrderDetail;
  }
}

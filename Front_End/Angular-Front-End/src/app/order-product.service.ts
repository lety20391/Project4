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
    if(this.listOrderDetail.length > 0){
      console.log(this.logClass + ' Search in List Order');
      console.log(this.logClass + ' OrderedProductID: ' + orderedProduct.proID);
      let index = this.listOrderDetail.findIndex(item => item.productEntity.proID == orderedProduct.proID);
      console.log(this.logClass + " Index:" + index);
      if(index >= 0){
        this.listOrderDetail[index].Qty += 1;
      }else{
        console.log(this.logClass + 'add new Order');
        this.newOrderDetail = new OrderDetail();
        this.newOrderDetail.productEntity = orderedProduct;
        this.newOrderDetail.Qty = 1;

        console.log(this.logClass + this.newOrderDetail.productEntity.ProName);

        this.listOrderDetail.push(this.newOrderDetail);
      }
    }else{
      console.log(this.logClass + 'add new Order');
      this.newOrderDetail = new OrderDetail();
      this.newOrderDetail.productEntity = orderedProduct;
      this.newOrderDetail.Qty = 1;

      console.log(this.logClass + this.newOrderDetail.productEntity.ProName);

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
}

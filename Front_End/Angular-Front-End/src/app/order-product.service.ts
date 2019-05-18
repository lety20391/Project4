import { Injectable, EventEmitter } from '@angular/core';
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
  listOrderDetail: OrderDetail[]=[];
  newOrderDetail: OrderDetail;
  data: string;
  urlAPI: UrlAPIEntity;

  listOrderChange: EventEmitter<OrderDetail[]> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  addNewProduct(orderedProduct: productEntity, isAdded: boolean){
    this.getDataFromLocalStorage();
    //neu listOrder dang co danh sach Product duoc dat thi se tim kiem trong do
    if(this.listOrderDetail.length > 0){
            console.log(this.logClass + ' Search in List Order');
            console.log(this.logClass + ' OrderedProductID: ' + orderedProduct.proID);
            let index = this.listOrderDetail.findIndex(item => item.productEntity.proID == orderedProduct.proID);
            console.log(this.logClass + " Index:" + index);

            //neu tim thay Product nay da duoc dat roi thi chi viec thay doi so luong
            if(index >= 0){

                  //neu isAdded = true nghia la cong them san pham vao
                  if(isAdded){
                    this.listOrderDetail[index].qty += 1;
                  }else{
                    //neu isAdded = false nghia la tru bot san pham ra
                    //neu so luong con lai >= 2 moi cho phep tru bot
                    if(this.listOrderDetail[index].qty >= 2)
                      this.listOrderDetail[index].qty -= 1;
                  }
            }else{

              //neu la tru bot so luong san pham thi thoat ra luon, vi khong tim thay san pham nao
              if(!isAdded)
                return;

              //neu khong tim thay Product nay trong danh sach dat hang thi phai tao moi trong listOrder
              console.log(this.logClass + 'add new Order');
              this.newOrderDetail = new OrderDetail();
              this.newOrderDetail.productEntity = orderedProduct;
              this.newOrderDetail.qty = 1;

              console.log(this.logClass + this.newOrderDetail.productEntity.proName);

              this.listOrderDetail.push(this.newOrderDetail);
            }
    }else{
      //neu la tru bot so luong san pham thi thoat ra luon, vi khong tim thay san pham nao
      if(!isAdded)
        return;

      //neu listOrder chua co Product nao thi tao moi Product nay
      console.log(this.logClass + 'add new Order');
      this.newOrderDetail = new OrderDetail();
      this.newOrderDetail.productEntity = orderedProduct;
      this.newOrderDetail.qty = 1;

      console.log(this.logClass + this.newOrderDetail.productEntity.proName);

      this.listOrderDetail.push(this.newOrderDetail);
    }
    console.log(this.logClass + 'List Order Detail qty: ' + this.listOrderDetail.length);

    this.saveToLocalStorage();
    this.listOrderChange.emit(this.listOrderDetail);
  }

  removeProduct(removedProduct: productEntity): void{
    //lay du lieu tu localStorage
    this.getDataFromLocalStorage();

    //remove product ra khoi danh sach listOrder
    const index: number = this.listOrderDetail.findIndex(item => item.productEntity.proID == removedProduct.proID);
    if (index !== -1) {
        this.listOrderDetail.splice(index, 1);
    }

    //luu xuong localStorage lai
    this.saveToLocalStorage();
    //this.listOrderChange.emit(this.listOrderDetail);
  }

  saveToLocalStorage():void {
    localStorage.setItem('listOrder', JSON.stringify(this.listOrderDetail));
  }

  clearLocalStorage():void {
    localStorage.setItem('listOrder', '');
  }

  getDataFromLocalStorage():void {
    this.data = localStorage.getItem('listOrder');
    //neu localStorage co data thi gan vao listOrderDetail
    if (this.data != '' && this.data != null){
      console.log(this.logClass + " Get data from Local Storage");
      this.listOrderDetail = JSON.parse(this.data);
    }
  }

  getTotalQuantity(): number{
    this.getDataFromLocalStorage();
    let total: number = 0;
    this.listOrderDetail.forEach(
      orderDetail => {
        total += orderDetail.qty;
      }
    );
    console.log(this.logClass + ' total quantity: ' + total);
    return total;
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
    return this.http.post<OrderMaster>(url.path, newOrderMaster);
  }
}

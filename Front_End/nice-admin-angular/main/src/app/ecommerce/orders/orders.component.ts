import { Component } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';

import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import {SmartTableLabelComponent} from '../smart-table-label/smart-table-label.component';
import { ProductEntity } from '../Entity/ProductEntity';
import { SmartTableProImgComponent } from '../smart-table-pro-img/smart-table-pro-img.component';
import { OrderDetail } from '../Entity/OrderDetail';
@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent {

  settings = {
              columns: {
                    ODetailID: {
                      title: 'ID',
                      editable: false,
                      width: '20px',
                    },
                    orderDate: {
                      title: 'Name',
                      width: '15%',
                    },
                    productImg:{
                      title: 'Image',
                      type: 'custom',
                      renderComponent: SmartTableProImgComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert(`${row.proColor} test!`);
                                          //localStorage.setItem('changedProductID', `${row.proID}`);
                                        }
                                    );

                              }
                    },
                    productInfo: {
                      title: 'Info',
                      width: '100px',
                      sort : true,
                    },
                    productPrice: {
                      title: 'Price',
                      width: '100px',
                      sort : true,
                    },
                    qty: {
                      title: 'Qty',
                      width: '100px',
                      sort : true,
                    },
                    status:{
                      title: 'Status',
                      editable: false,
                      width: '100px',
                      type: 'custom',
                      renderComponent: SmartTableLabelComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert(`${row.proColor} test!`);
                                          localStorage.setItem('changedProductID', `${row.proID}`);
                                        }
                                    );

                              }
                    }

                  },
                  edit: {
                    confirmSave: true,
                    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
                    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
                    cancelButtonContent: '<i class="ti-close text-danger"></i>'
                  },
                  delete: {
                    confirmDelete: true,
                    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
                    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
                    cancelButtonContent: '<i class="ti-close text-danger"></i>'
                  },
                  add: {confirmCreate: true},
                  mode: 'inline'
            };
  listOrderDetail: OrderDetail[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Order Component: ';
  tempOrderDetail: OrderDetail = new OrderDetail();
  isShowTable: boolean = false;

  constructor(
    private productService: ProductServiceService,
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllByOrderMaster(1);
  }

  getAllByOrderMaster(omID: number): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
      console.log(this.logClass + this.urlAPI.path)

      //prepare headers
      let headers = this.createHeader();

      this.http.get<HttpResponse<OrderDetail[]>>(this.urlAPI.path + "/list/findAllByOrderMaster/" + omID,  { headers: headers, observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listOrderDetail = JSON.parse(JSON.stringify(response.body));

                //lay hinh ve
                let index: number = 0;
                this.listOrderDetail.forEach(
                      item => {
                        this.productService.getAllProductImage(item.productEntity.proID)
                          .subscribe(
                            result => {
                              let tempImgList = JSON.parse(JSON.stringify(result));
                              //lay 1 hinh lam mau cho proImage
                              //them proID vao Img de lay hinh
                              //vi du: /1/ab
                              if(tempImgList instanceof Array){
                                item.productImg= '/' + item.productEntity.proID + '/' + tempImgList[0];
                                console.log(this.logClass + ' link Pro Img: ' + item.productImg);
                              }

                              //lay them du lieu ve ID + ProductName de lam cot product Info
                              item.productInfo = 'ID: ' + item.productEntity.proID + ' - ' + item.productEntity.proName;
                              item.productPrice = item.productEntity.proPrice;
                              item.totalPrice = item.productEntity.proPrice * item.qty;


                              index += 1;
                              if( index == this.listOrderDetail.length){
                                this.isShowTable = true;
                                index = 0;
                              }

                            }
                          );
                      }
                );


              }
              // if (response.status == 200){
              //   this.isLogined = true;
              //   console.log( response.headers.get('Authorization') );
              //   let auth = response.headers.get('Authorization');
              //   this.jwtService.addJWT(auth);
              //   console.log('Get jwt: ' + this.jwtService.getJWT());
              // }else{
              //   this.pass = 'Please Enter Code Again';
              // }

            }
      );
  }

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}

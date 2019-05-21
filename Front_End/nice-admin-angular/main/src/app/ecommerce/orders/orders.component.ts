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
import { OrderMaster } from '../Entity/OrderMaster';
@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent {

  //table setting for Order Detail
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
                      editable: false,
                      type: 'custom',
                      renderComponent: SmartTableProImgComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert('test');

                                        }
                                    );

                              }
                    },
                    productInfo: {
                      title: 'Info',
                      width: '100px',
                      editable: false,
                      sort : true,
                    },
                    productPrice: {
                      title: 'Price',
                      width: '100px',
                      editable: false,
                      sort : true,
                    },
                    qty: {
                      title: 'Qty',
                      width: '100px',
                      sort : true,
                    },
                    totalPrice: {
                      title: 'Total',
                      width: '100px',
                      editable: false,
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
                                          localStorage.setItem('changedOrderDetailID', `${row.ODetailID}`);
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
                  actions :{
                    add: false,
                  },
                  mode: 'inline'
            };

  //table setting for Order Master
  settings2 = {
              columns: {
                    orderID: {
                      title: 'ID',
                      editable: false,
                      width: '20px',
                    },
                    creDate: {
                      title: 'Cre Date',
                      width: '15%',
                      sort : true,
                    },
                    shipDate: {
                      title: 'Ship',
                      width: '15%',
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
                                          localStorage.setItem('changedOrderMasterID', `${row.orderID}`);
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
                  actions :{
                    add: false,
                  },
                  mode: 'inline'
            };

  listOrderDetail: OrderDetail[] = [];
  listOrderMaster: OrderMaster[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Order Component: ';
  tempOrderDetail: OrderDetail = new OrderDetail();
  tempOrderMaster: OrderMaster = new OrderMaster();
  currentOrderMasterID: number;
  isShowTable: boolean = false;


  constructor(
    private productService: ProductServiceService,
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllByOrderMaster();
    this.getAllByOrderDetail(1);
  }

  getAllByOrderMaster(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'orderMasterFullResource');
      console.log(this.logClass + this.urlAPI.path);

      //prepare headers
      let headers = this.createHeader();

      this.http.get<HttpResponse<OrderMaster[]>>(this.urlAPI.path + "/list/OrderByCreDate",  { headers: headers, observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listOrderMaster = JSON.parse(JSON.stringify(response.body));

                // //lay hinh ve
                // let index: number = 0;
                // this.listOrderDetail.forEach(
                //       item => {
                //         this.productService.getAllProductImage(item.productEntity.proID)
                //           .subscribe(
                //             result => {
                //               let tempImgList = JSON.parse(JSON.stringify(result));
                //               //lay 1 hinh lam mau cho proImage
                //               //them proID vao Img de lay hinh
                //               //vi du: /1/ab
                //               if(tempImgList instanceof Array){
                //                 item.productImg= '/' + item.productEntity.proID + '/' + tempImgList[0];
                //                 console.log(this.logClass + ' link Pro Img: ' + item.productImg);
                //               }
                //
                //               //lay them du lieu ve ID + ProductName de lam cot product Info
                //               item.productInfo = 'ID: ' + item.productEntity.proID + ' - ' + item.productEntity.proName;
                //               item.productPrice = item.productEntity.proPrice;
                //               item.totalPrice = item.productEntity.proPrice * item.qty;
                //
                //
                //               index += 1;
                //               if( index == this.listOrderDetail.length){
                //                 this.isShowTable = true;
                //                 index = 0;
                //               }
                //
                //             }
                //           );
                //       }
                // );


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

  getAllByOrderDetail(omID: number): void{
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

  selectedOrderDetailRow(event: any): void{
    console.log(this.logClass + ' selected OrderDetail Row:' + JSON.stringify(event.data));
    //lay ID tu localStorage de  kiem tra xem co phai day la update status khong
    let stringID = localStorage.getItem('changedOrderDetailID');
    if(stringID != null && stringID != ''){
      if(JSON.stringify(event.data.ODetailID) == stringID){
        //update Status
        //prepare headers
        let headers = this.createHeader();

        this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
        console.log(this.logClass + this.urlAPI.path);

        //update Database
        this.http.put<HttpResponse<OrderDetail>>(this.urlAPI.path , event.data ,{ headers: headers, observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  localStorage.setItem('changedOrderDetailID', '');

                  //update data source trong bang
                  event.source.update(event.data);


                }


              }
        );


      }
    }

  }

  updateOrderDetailRow(event: any): void{
    this.tempOrderDetail = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' updated OrderDetail' + JSON.stringify(this.tempOrderDetail));

    //update Local listProduct
    event.confirm.resolve(event.newData);

    this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    this.http.put<HttpResponse<OrderDetail>>(this.urlAPI.path , event.newData ,{ headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));

              //reload data from server
              this.isShowTable = false;
              //this.getAllByOrderMaster();
              this.getAllByOrderDetail(this.currentOrderMasterID);

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

  deleteOrderDetailRow(event: any): void {
    this.tempOrderDetail = JSON.parse(JSON.stringify(event.data));
    console.log(this.logClass + ' delete Order Detail' + JSON.stringify(this.tempOrderDetail));

    //update Local listProduct
    event.confirm.resolve();

    this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    //delete is just update status form True to False
    this.tempOrderDetail.status = false;
    this.http.put<HttpResponse<OrderDetail>>(this.urlAPI.path , this.tempOrderDetail , { headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));

              //reload data from server
              this.isShowTable = false;
              //this.getAllByOrderMaster();
              this.getAllByOrderDetail(this.currentOrderMasterID);

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

  selectedOrderMaster(event: any): void{
    console.log(this.logClass + ' selected OrderMaster Row:' + JSON.stringify(event.data));
    //lay ID tu localStorage de  kiem tra xem co phai day la update status khong
    let stringID = localStorage.getItem('changedOrderMasterID');
    if(stringID != null && stringID != ''){
      if(JSON.stringify(event.data.orderID) == stringID){
        //update Status
        //prepare headers
        let headers = this.createHeader();

        this.urlAPI = listUrlAPI.find(url => url.name === 'orderMasterFullResource');
        console.log(this.logClass + this.urlAPI.path);

        //update Database
        this.http.put<HttpResponse<OrderMaster>>(this.urlAPI.path , event.data ,{ headers: headers, observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  localStorage.setItem('changedOrderMasterID', '');

                  //update data source trong bang
                  event.source.update(event.data);


                }


              }
        );


      }
    }else{
      this.isShowTable = false;
      this.currentOrderMasterID = event.data.orderID;
      this.getAllByOrderDetail(event.data.orderID);
    }

  }

  updateOrderMasterRow(event: any): void{
    this.tempOrderMaster = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' updated OrderMaster' + JSON.stringify(this.tempOrderMaster));

    //update Local listProduct
    event.confirm.resolve(event.newData);

    this.urlAPI = listUrlAPI.find(url => url.name === 'orderMasterFullResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    this.http.put<HttpResponse<OrderMaster>>(this.urlAPI.path , event.newData ,{ headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));

              //reload data from server
              this.isShowTable = false;
              this.getAllByOrderMaster();
              this.getAllByOrderDetail(1);

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

  deleteOrderMasterRow(event: any): void {
    this.tempOrderMaster = JSON.parse(JSON.stringify(event.data));
    console.log(this.logClass + ' delete Order Master' + JSON.stringify(this.tempOrderMaster));

    //update Local listProduct
    event.confirm.resolve();

    this.urlAPI = listUrlAPI.find(url => url.name === 'orderMasterFullResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    //delete is just update status form True to False
    this.tempOrderMaster.status = false;
    this.http.put<HttpResponse<OrderMaster>>(this.urlAPI.path , this.tempOrderMaster , { headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));

              //reload data from server
              this.isShowTable = false;
              this.getAllByOrderMaster();
              this.getAllByOrderDetail(1);

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

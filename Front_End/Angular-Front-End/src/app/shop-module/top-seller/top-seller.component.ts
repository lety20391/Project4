import { Component, OnInit, Input } from '@angular/core';
import { OrderDetail} from '../../cart-module/OrderDetail';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { productEntity} from '../../productEntity/productEntity';
import {Observable, of} from 'rxjs';
import { ReportObject } from 'src/app/ReportEntity/ReportObject';
@Component({
  selector: 'app-topseller',
  templateUrl: './top-seller.component.html',
  styleUrls: ['./top-seller.component.css']
})
export class TopsellerComponent implements OnInit {
  logClass = '--TopSeller Manage Service: ';
  urlAPI: UrlAPIEntity;
  listTop : OrderDetail[] = [];
  isShowTopSeller: boolean = false;
  @Input() isInPageMode: boolean = true;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchTopSeller();
  }

    fetchTopSeller(): void{
      this.urlAPI = listUrlAPI.find(url => url.name === 'topsellerResource');
      console.log(this.logClass + this.urlAPI.path)
        this.http.get<HttpResponse<Object[]>>(this.urlAPI.path + "/list",  { observe: 'response' })
        .subscribe(
                response =>{
                  console.log( response);
                  console.log( response.status );
                  if (response.status == 200){
                    console.log(this.logClass + " response: " + response);
                    //chuyen du lieu tu response.body ve lai kieu array
                    //response tra ve co dang the nay [[2,9],[3,14],[1,22]]
                    console.log(JSON.stringify(response.body));
                    let tempArray = [];
                    if(JSON.parse(JSON.stringify(response.body)) instanceof Array){
                          tempArray = JSON.parse(JSON.stringify(response.body));
                          tempArray.forEach(
                                  item => {
                                        //item co du lieu dang nhu the nay [2, 9]
                                        //cai dau tien la proID, cai thu 2 la totalQty
                                        let tempData = new Array(2);
                                        tempData = JSON.parse(JSON.stringify(item));
                                        //nhu vay tempData[0] se la ID
                                        //tempData[1] se la totalQty

                                        let tempOrderDetail: OrderDetail = new OrderDetail();
                                        tempOrderDetail.productEntity = new productEntity();

                                        this.urlAPI = listUrlAPI.find(url => url.name === 'productDetailResource');
                                        console.log(this.logClass + this.urlAPI.path);


                                        this.http.get<productEntity[]>(this.urlAPI.path + '/' + tempData[0])
                                          .subscribe(
                                              response => {
                                                    //response tra ve la Product ta se tim them hinh gan vao Product nay cho day du luon
                                                    let tempProduct: productEntity = new productEntity();
                                                    tempProduct = JSON.parse(JSON.stringify(response));

                                                    //len server lay them Image ve cho day du
                                                    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                                                    console.log(this.logClass + this.urlAPI.path);

                                                    //goi len server de lay danh sach hinh anh ve
                                                    this.http.get<string[]>(this.urlAPI.path + '/Product/' + tempProduct.proID)
                                                    .subscribe(
                                                      result => {
                                                                  console.log(this.logClass + ' Image Load:' + result);
                                                                  //gan ket qua tra ve vao thuoc tinh petListImage
                                                                  tempProduct.proListImage = result;
                                                                  tempOrderDetail.productEntity = tempProduct;
                                                                }
                                                    );

                                              }
                                          );

                                        tempOrderDetail.qty = Number(tempData[1]);
                                        this.listTop.push(tempOrderDetail);
                                  }
                          );
                          this.isShowTopSeller = true;
                    }


                  }
                }
      );
    }
}

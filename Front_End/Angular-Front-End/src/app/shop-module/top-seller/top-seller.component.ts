import { Component, OnInit, Input } from '@angular/core';
import { OrderDetail} from '../../cart-module/OrderDetail';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { productEntity} from '../../productEntity/productEntity';
import {Observable, of} from 'rxjs';
@Component({
  selector: 'app-topseller',
  templateUrl: './top-seller.component.html',
  styleUrls: ['./top-seller.component.css']
})
export class TopsellerComponent implements OnInit {
  logClass = '--TopSeller Manage Service: ';
urlAPI: UrlAPIEntity;
  listTop : OrderDetail[] = [];

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
            //roi gan vao listPet
            console.log(JSON.stringify(response.body));
            this.listTop = JSON.parse(JSON.stringify(response.body));
            console.log("ListTop" + this.listTop);
            this.listTop.forEach(
                  item => {
                    //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
                    console.log("item name" + item.productEntity.proName);
                    item.productEntity.proListImage = [];
                    console.log(this.logClass + " getImagePath");
                    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                    console.log(this.logClass + this.urlAPI.path);

                    //goi len server de lay danh sach hinh anh ve
                    this.http.get<string[]>(this.urlAPI.path + '/Product/' + item.productEntity.proID)
                    .subscribe(
                      result => {
                                  console.log(this.logClass + ' Image Load:' + result);
                                  //gan ket qua tra ve vao thuoc tinh petListImage
                                  item.productEntity.proListImage = result;
                                }
                    );
                  }
            );
          }
        }
      );
    }
}

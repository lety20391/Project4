import { Component, OnInit } from '@angular/core';
import { OrderDetail} from '../../cart-module/OrderDetail';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
@Component({
  selector: 'app-topseller',
  templateUrl: './topseller.component.html',
  styleUrls: ['./topseller.component.css']
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
            this.listTop = JSON.parse(JSON.stringify(response.body)).slice(1-3);
            console.log("ListTop" + this.listTop)
            
          }
        }
      );
    }
}

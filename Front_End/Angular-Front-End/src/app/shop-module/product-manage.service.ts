import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productEntity } from '../productEntity/productEntity';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { JWTHeaderService } from '../jwtheader.service';
import { HttpHeaders } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXQiLCJhdWQiOiJKYXZhRUUgU290ZXJpYSBKV1QiLCJyZWFsbV9hY2Nlc3MiOnsiZ3JvdXBzIjpbIkFETUlOIiwiTUVNQkVSIl19LCJpc3MiOiJzd2hwIiwiZXhwIjoxNTU2NzA0OTU3LCJpYXQiOjE1NTY0NDU3NTd9.qEBsCgRiKsJgO9j2sktzxiqOTyGLcr6gO86zE83saOI'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ProductManageService {

  urlAPI: UrlAPIEntity;
  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  getProductList(): Observable<productEntity[]> {
    console.log("------Get API Product Service ------");
    //console.log(this.http.get<productEntity[]>("http://localhost:34828/1Hero-web/rest/product/"));
    console.log(this.jwtService.getJWT());

    //change your url name here
    this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
    return this.http.get<productEntity[]>(this.urlAPI.path );
  }

//Login and Authentication success
  // createAuthHeader(): []{
  //   httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': this.jwtService.getJWT
  //     })
  //   };
  // }
}

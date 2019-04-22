import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productEntity } from '../productEntity/productEntity';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';

@Injectable({
  providedIn: 'root'
})
export class ProductManageService {

  urlAPI: UrlAPIEntity;
  constructor(
    private http: HttpClient
  ) { }

  getProductList(): Observable<productEntity[]> {
    console.log("------Get API Product Service ------");
    //console.log(this.http.get<productEntity[]>("http://localhost:34828/1Hero-web/rest/product/"));

    this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
    return this.http.get<productEntity[]>(this.urlAPI.path);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productEntity } from '../productEntity/productEntity';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManageService {

  constructor(
    private http: HttpClient
  ) { }

  getProductList(): Observable<productEntity[]> {
    console.log("------Get API ------");
    //console.log(this.http.get<productEntity[]>("http://localhost:34828/1Hero-web/rest/product/"));
    return this.http.get<productEntity[]>("http://localhost:34828/1Hero-web/rest/product/");
  }
}

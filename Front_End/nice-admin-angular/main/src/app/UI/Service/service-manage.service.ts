import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceManageService {
  urlAPI: UrlAPIEntity;
  constructor(
    private http: HttpClient
  ) { }

  getServiceList(): Observable<serviceEntity[]> {
  console.log("------Get API Product Service ------");
  //console.log(this.http.get<productEntity[]>("http://localhost:34828/1Hero-web/rest/product/"));

  //change your url name here
  this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
  return this.http.get<serviceEntity[]>(this.urlAPI.path);
}

  getServiceDetail(id: number): Observable<any> {
    console.log("------Get API Service ------");
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    // const url = `${this.urlAPI}/${id}`;
    return this.http.get(this.urlAPI.path + id);
    console.log("------Get API Service Success ------");
  }
  deleteServiceDetail(id: number): Observable<any> {
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    // const url = `${this.urlAPI}/${id}`;
    return this.http.delete(this.urlAPI.path + id);
    console.log("------Get API Service Success ------");
  }
  }

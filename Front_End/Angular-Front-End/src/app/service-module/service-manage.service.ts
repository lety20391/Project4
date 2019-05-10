import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceEntity } from '../serviceEntity/serviceEntity';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceManageService {
    logClass = '--Service Manage Service: ';
  urlAPI: UrlAPIEntity;
  constructor(
    private http: HttpClient
  ) { }

  getServiceList(): Observable<serviceEntity[]> {
    console.log("------Get API Product Service ------");
    //console.log(this.http.get<productEntity[]>("http://localhost:34828/1Hero-web/rest/product/"));

    //change your url name here
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    return this.http.get<serviceEntity[]>(this.urlAPI.path + '/list');
  }
  getServiceDetail(id: number): Observable<any> {
    console.log("------Get API Service ------");
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceDetailResource');
    // const url = `${this.urlAPI}/${id}`;
    return this.http.get(this.urlAPI.path + '/' + id);
    console.log("------Get API Service Success ------");
  }
  getAllServiceImage(id: number): Observable<string[]>{
    console.log(this.logClass + ' get All Image for service' + id);
    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
    return this.http.get<string[]>(this.urlAPI.path + '/Service/' + id);
  }
  }

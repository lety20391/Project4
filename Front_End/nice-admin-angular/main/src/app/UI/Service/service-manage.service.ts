import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceManageService {
  urlAPI: UrlAPIEntity;
  service: serviceEntity;
  constructor(
    private http: HttpClient
  ) { }

  getServiceList(): Observable<serviceEntity[]> {
  console.log("------Get API Product Service ------");
  this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
  return this.http.get<serviceEntity[]>(this.urlAPI.path  + 'list');
}

  getServiceDetail(id: number): Observable<any> {
    console.log("------Get API Service ------");
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    return this.http.get<serviceEntity>(this.urlAPI.path + id);
    console.log("------Get API Service Success ------");
  }
  deleteServiceDetail(id: number): Observable<any> {
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    return this.http.delete<HttpResponse<Object>>(this.urlAPI.path + id);

  }

}

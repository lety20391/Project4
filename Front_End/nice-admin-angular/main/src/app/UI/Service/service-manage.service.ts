import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { catchError, map, tap } from 'rxjs/operators';
import { JWTHeaderService } from 'src/app/jwtheader.service';

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
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  getServiceList(): Observable<serviceEntity[]> {
  console.log("------Get API Product Service ------");
  this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
  return this.http.get<serviceEntity[]>(this.urlAPI.path  + '/list');
}

  getServiceDetail(id: number): Observable<serviceEntity> {
    console.log("------Get API Service ------");
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    return this.http.get<serviceEntity>(this.urlAPI.path + '/getDetail/findID/' + id);
  }
  // deleteServiceDetail(id: number): Observable<any> {
  //   this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
  //   return this.http.delete<HttpResponse<Object>>(this.urlAPI.path + "/delete/" + id);
  //
  // }
  getAllServiceImage(id: number): Observable<string[]>{
    console.log(' get All Image for Service' + id);
    // let headers = this.createHeader();
    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
    return this.http.get<string[]>(this.urlAPI.path + '/Service/' + id);
  }
  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }
}

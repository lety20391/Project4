import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import {PetEntity} from './PetEntity';
import {DatingDetailEntity} from './DatingDetailEntity';

@Injectable({
  providedIn: 'root'
})
export class DatingManageService {

  logClass = '--Dating manage service: ';
  urlAPI: UrlAPIEntity;
  constructor(
    private http: HttpClient
  ) { }

  sendRequestDating(datingDetail: DatingDetailEntity): Observable<DatingDetailEntity>{
    console.log(this.logClass + " sendRequestDating");
    this.urlAPI = listUrlAPI.find(url => url.name === 'datingDetailResource');
    return this.http.post<DatingDetailEntity>(this.urlAPI.path + "/Post", datingDetail);
  }

}

import { Injectable } from '@angular/core';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  urlAPI: UrlAPIEntity;
  logClass= '----Image service Ecommerce';

  constructor(
    private http: HttpClient
  ) { }

  getAllImage(id: number, category: string): Observable<string[]>{
    console.log(this.logClass + ' get All Image for: ' + category + id);
    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
    return this.http.get<string[]>(this.urlAPI.path + '/' + category + '/' + id);
  }

}

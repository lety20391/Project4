import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {
  ID: number;
  Name: string;
  Des: string;
  ShortDes: string;
  Status: boolean;
  Image: 'aaaaa';
  urlAPI : UrlAPIEntity;
  service = new serviceEntity();
  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
  }
  addNewService(): void {
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource' );
  this.service.serID = this.ID;
  this.service.serName = this.Name;
  this.service.serDes = this.Des;
  this.service.serShortDes = this.ShortDes;
  this.service.status = this.Status;
  this.service.serImage = this.Image;
  this.http.post<serviceEntity>(this.urlAPI.path, this.service, httpOptions).subscribe(result => {console.log(result)});
  }
}

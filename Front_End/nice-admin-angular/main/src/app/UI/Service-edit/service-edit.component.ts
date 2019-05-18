import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  @Input() edit : serviceEntity = new serviceEntity();
  urlAPI: UrlAPIEntity;
  constructor(
    private route: ActivatedRoute,
    private ServiceManageService: ServiceManageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getServiceDetail();
  }
  getServiceDetail(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getServiceDetail(id)
        .subscribe(result =>{
          console.log("this is result:" + JSON.stringify(result));
          this.edit = result;
          }
        );
    }
    editService(): void {
      this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource' );
    this.http.put<serviceEntity>(this.urlAPI.path + "/edit", this.edit, httpOptions).subscribe(result => {console.log(result)});
    }
}

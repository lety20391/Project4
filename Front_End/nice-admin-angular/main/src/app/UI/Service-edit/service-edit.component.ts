import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../Dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
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
    private dialog: MatDialog,
    private http: HttpClient,
    private location: Location,
    private router: Router
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
    this.http.put<HttpResponse<serviceEntity>>(this.urlAPI.path + "/edit", this.edit, {observe : 'response'}).subscribe(
      response =>
      {
        if(response.status == 200)
        {
          alert("Edit service successfully!!!");
          this.location.back();
        }
      }
    );
    }
    turnBack(): void {
      this.location.back();
    }
    openCancelDialog(): void {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '350px',
              data: "Are you sure to cancel? "
            });

            dialogRef.afterClosed().subscribe(result => {
              if(result) {
                console.log('Yes clicked');
                this.turnBack();
                // DO SOMETHING
              }
            });
          }
}

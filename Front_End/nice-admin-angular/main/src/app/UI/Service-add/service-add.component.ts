import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import {Observable, of} from 'rxjs';
import { Router } from '@angular/router'
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../Dialog/confirm-dialog.component';
import { UploadAdapter } from '../../ecommerce/UploadAdapter/upload-adapter';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
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
  adapter: UploadAdapter;
  isReadyToUploadImage : boolean = false;
  ID: number;
  Name: string;
  Des: string;
  ShortDes: string;
  Status: boolean;
  // Image: 'aaaaa';
  urlAPI : UrlAPIEntity;
  service = new serviceEntity();
  constructor(
    private http:HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }
  addNewService(): void {
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource' );
  this.service.serID = this.ID;
  this.service.serName = this.Name;
  this.service.serDes = this.Des;
  this.service.serShortDes = this.ShortDes;
  this.service.status = true;
  // this.service.serImage = this.Image;
  this.http.post<serviceEntity>(this.urlAPI.path + "/add", this.service, httpOptions).subscribe(
    result =>
        {
          this.isReadyToUploadImage = true;
          this.urlAPI = listUrlAPI.find(url => url.name === 'uploadResource');
          this.urlAPI.path += "/file/" + "Service/" + result.serID;
          console.log(this.urlAPI.path);
          this.adapter = new UploadAdapter(this.http, this.urlAPI.path );

        }
  );


  }
  turnBack(): void {
    this.router.navigateByUrl("/service/services")
  }
  openConfirmDialog(): void {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: "Are you sure to create new Service? "
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result) {
              console.log('Yes clicked');
              this.addNewService();
              // DO SOMETHING
            }
          });
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

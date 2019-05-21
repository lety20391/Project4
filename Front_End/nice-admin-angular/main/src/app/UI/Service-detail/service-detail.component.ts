import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../Dialog/confirm-dialog.component';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpResponse,  HttpHeaders } from '@angular/common/http';
// import { ServiceComponentComponent} from '../Service/service-component.component';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  @Input() detail: serviceEntity  = new serviceEntity();
  logClass : "service detail component";
  serListImage: string[] = [];
  urlAPI: UrlAPIEntity;
  newDetail = new serviceEntity();
  // listServiceCate: serviceEntity[];
  constructor(
     private route: ActivatedRoute,
     private ServiceManageService: ServiceManageService,
     private dialog: MatDialog,
     private router: Router,
     private location: Location,
     private http : HttpClient
     // private serviceComponentComponent : ServiceComponentComponent
  ) { }

  ngOnInit() {
    this.getServiceDetail();

  }

  getServiceDetail(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getServiceDetail(id)
        .subscribe(result => {
          console.log("all detail:" + JSON.stringify(result))
          this.detail = result;
          console.log("this is ID::" + this.detail.serID);
          this.getAllServiceImage(this.detail.serID);
        });
    }

  deleteServiceDetail(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.ServiceManageService.getServiceDetail(id)
        .subscribe(
          item => {
                this.newDetail = item;
                this.newDetail.status = false;
                this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource' );
                this.http.put<HttpResponse<serviceEntity>>(this.urlAPI.path + "/edit", this.newDetail, {observe : 'response'}).subscribe(
                response =>
                {
                  if(response.status == 200)
                  {
                    alert("Delete service successfully!!!");
                    this.location.back();
                  }
                } );             
          }
        );

         // setTimeout(() =>{this.location.back()}, 500);
      }
      editService(edit : serviceEntity): void {
        this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource' );
      this.http.put<HttpResponse<serviceEntity>>(this.urlAPI.path + "/edit", edit, {observe : 'response'}).subscribe(
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
      // fetchServiceCate(): void{
      //   this.ServiceManageService.getServiceList().subscribe(
      //     listResult => this.listServiceCate = listResult
      //   );
      // }

      getAllServiceImage(id: number): void{
            // console.log(this.logClass + " Get All Image");
            // id = +this.route.snapshot.paramMap.get('id');
            // console.log("this is id" + id)
            this.ServiceManageService.getAllServiceImage(id).subscribe(
              result => {
                          console.log(this.logClass + ' Image Load');
                          this.serListImage = result;
                        }
            );
          }
openDeleteDialog(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: "Are you sure to delete? "
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            console.log('Yes clicked');
            this.deleteServiceDetail();
            // DO SOMETHING
          }
        });
      }

}

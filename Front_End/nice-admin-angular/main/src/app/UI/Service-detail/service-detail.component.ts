import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../Dialog/confirm-dialog.component';
import {Observable, of} from 'rxjs';
// import { ServiceComponentComponent} from '../Service/service-component.component';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  @Input() detail: serviceEntity;
  // listServiceCate: serviceEntity[];
  constructor(
     private route: ActivatedRoute,
     private ServiceManageService: ServiceManageService,
     private dialog: MatDialog,
     private router: Router,
     private location: Location,
     // private serviceComponentComponent : ServiceComponentComponent
  ) { }

  ngOnInit() {
    this.getServiceDetail();

     // this.fetchServiceCate();
  }

  getServiceDetail(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getServiceDetail(id)
        .subscribe(detail => this.detail = detail);
    }

  deleteServiceDetail(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.ServiceManageService.deleteServiceDetail(id)
        .subscribe();
        console.log("delete complete");
         setTimeout(() =>{this.location.back()}, 500);
      }
      // fetchServiceCate(): void{
      //   this.ServiceManageService.getServiceList().subscribe(
      //     listResult => this.listServiceCate = listResult
      //   );
      // }


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

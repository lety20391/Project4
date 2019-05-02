import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../Dialog/confirm-dialog.component';
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
     private location: Location
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


  deleteServiceDetail(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.ServiceManageService.deleteServiceDetail(id)
        .subscribe();
        this.router.navigate(['/service/services']);
        console.log("delete complete");
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

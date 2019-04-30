import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../../service-module/service-manage.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  @Input() detail: serviceEntity;
  listServiceCate: serviceEntity[];
  constructor(
     private route: ActivatedRoute,
     private ServiceManageService: ServiceManageService
  ) { }

  ngOnInit() {
     this.getServiceDetail();
     this.fetchServiceCate();
  }
  getServiceDetail(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getServiceDetail(id)
        .subscribe(detail => this.detail = detail);
    }
    fetchServiceCate(): void{
      this.ServiceManageService.getServiceList().subscribe(
        listResult => this.listServiceCate = listResult
      );
    }
}

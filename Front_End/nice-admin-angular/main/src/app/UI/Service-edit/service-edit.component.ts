import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../Service/service-manage.service';
@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  @Input() edit = new serviceEntity();
  constructor(
    private route: ActivatedRoute,
    private ServiceManageService: ServiceManageService
  ) { }

  ngOnInit() {
    this.getServiceDetail();
  }
  getServiceDetail(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getServiceDetail(id)
        .subscribe(detail => this.edit = detail);
    }
}

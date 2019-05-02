import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from './service-manage.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-service-component',
  templateUrl: './service-component.component.html',
  styleUrls: ['./service-component.component.css']
})
export class ServiceComponentComponent implements OnInit {

  listService: serviceEntity[];
  constructor(
      private serviceManageService: ServiceManageService,
      private location: Location
  ) {
    }

  ngOnInit() {
      this.fetchService();
    }

  ngOnDestroy() {

  }

    fetchService(): void{
      this.serviceManageService.getServiceList().subscribe(
        listResult => this.listService = listResult
      );
    }

}

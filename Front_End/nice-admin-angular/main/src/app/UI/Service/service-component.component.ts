import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from './service-manage.service';

@Component({
  selector: 'app-service-component',
  templateUrl: './service-component.component.html',
  styleUrls: ['./service-component.component.css']
})
export class ServiceComponentComponent implements OnInit {

  listService: serviceEntity[];
  constructor(
      private serviceManageService: ServiceManageService
  ) { }

  ngOnInit() {
      
      this.fetchService();
    }

    fetchService(): void{
      this.serviceManageService.getServiceList().subscribe(
        listResult => this.listService = listResult
      );
    }

}

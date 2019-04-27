import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../serviceEntity/serviceEntity';
import { ServiceManageService } from './service-manage.service';


@Component({
  selector: 'app-ser',
  templateUrl: './ser.component.html',
  styleUrls: ['./ser.component.css']
})
export class SerComponent implements OnInit {


  serTitle = 'Service';
  serviceContent = "Your pet's health and well-being are our top priority.";
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

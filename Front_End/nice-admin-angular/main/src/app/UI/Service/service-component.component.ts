import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from './service-manage.service';
import { Location } from '@angular/common'
import { UrlAPIEntity} from '../../UrlAPIEntity';
@Component({
  selector: 'app-service-component',
  templateUrl: './service-component.component.html',
  styleUrls: ['./service-component.component.css']
})
export class ServiceComponentComponent implements OnInit {
    urlAPI: UrlAPIEntity;
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
        listResult => {

          this.listService = listResult
          this.listService.forEach(
            item => {
              console.log("item ID: "+ item.serID);
              this.serviceManageService.getAllServiceImage(item.serID)
                .subscribe(
                  result => {
                    item.serListImage = JSON.parse(JSON.stringify(result));
                  }
                );
            }
          );
        }
      );
    }


}

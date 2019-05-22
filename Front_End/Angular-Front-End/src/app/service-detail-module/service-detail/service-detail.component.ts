import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { serviceEntity } from '../../serviceEntity/serviceEntity';
import { ServiceManageService } from '../../service-module/service-manage.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  @Input() detail: serviceEntity = new serviceEntity() ;
  listServiceCate: serviceEntity[] = [];
  listImage: string[] = [];
  logClass : "Pet-detail";
  currentSerID : number;
  constructor(
     private route: ActivatedRoute,
     private ServiceManageService: ServiceManageService
  ) { }

  ngOnInit() {
     this.getID();
     this.fetchServiceCate();
     //
  }
  getServiceDetail(id: number): void {
      // const id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getServiceDetail(id)
        .subscribe(detail =>{
          this.detail = detail;
            this.getAllServiceImage(this.detail.serID);
        });
    }
    fetchServiceCate(): void{
      this.ServiceManageService.getServiceList().subscribe(
        listResult => this.listServiceCate = listResult
      );
    }
    getAllServiceImage(id: number): void{
      console.log(this.logClass + " Get All Image");
      id = +this.route.snapshot.paramMap.get('id');
      this.ServiceManageService.getAllServiceImage(id).subscribe(
        result => {
                    console.log(this.logClass + ' Image Load');
                    this.listImage = result;

                  }
      );
    }
    getID(): void{
      const id = +this.route.snapshot.paramMap.get('id');
      this.currentSerID = id;
      console.log("this is current service ID: " + this.currentSerID);
      this.getServiceDetail(this.currentSerID);
    }
    filterActiveService(){
      return this.listServiceCate.filter( item => item.status == true);
    }
}

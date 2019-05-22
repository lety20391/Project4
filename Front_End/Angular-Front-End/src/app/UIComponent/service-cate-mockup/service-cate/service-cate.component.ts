import { Component, OnInit, Input } from '@angular/core';
import { serviceEntity } from '../../../serviceEntity/serviceEntity';
import { ServiceDetailComponent} from '../../../service-detail-module/service-detail/service-detail.component';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-service-cate',
  templateUrl: './service-cate.component.html',
  styleUrls: ['./service-cate.component.css']
})
export class ServiceCateComponent implements OnInit {
@Input() inputService: serviceEntity = new serviceEntity();
currentSerID : number;
  constructor(
    private service: ServiceDetailComponent,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
  }
  reload(id: number): void {
    this.router.navigateByUrl('/mainlayout/services/' + id);

    setTimeout(() => {
      // this.service.getAllServiceImage(id);
    this.service.getServiceDetail(id);
  },200)


  }
//   getID(): void{
//     const id = +this.route.snapshot.paramMap.get('id');
//     this.currentSerID = id;
//     console.log("selecte ID" + this.currentSerID);
//     this.service.getServiceDetail(this.currentSerID);
// }
}

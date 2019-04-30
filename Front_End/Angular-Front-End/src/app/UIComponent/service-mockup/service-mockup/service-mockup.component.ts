import { Component, OnInit , Input} from '@angular/core';
import { serviceEntity } from '../../../serviceEntity/serviceEntity';

@Component({
  selector: 'app-service-mockup',
  templateUrl: './service-mockup.component.html',
  styleUrls: ['./service-mockup.component.css']
})
export class ServiceMockupComponent implements OnInit {
@Input() inputService: serviceEntity;

//   service: serviceEntity = {
//   SerID: 1,
//   SerName: 'Name1',
//   SerDes: 'abc',
//   SerImage: 'assets/images/dummy-img-600x600.jpg',
//   SerStatus: true
// };
  constructor() { }

  ngOnInit() {
  }

}

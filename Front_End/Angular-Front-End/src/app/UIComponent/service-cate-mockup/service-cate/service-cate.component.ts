import { Component, OnInit, Input } from '@angular/core';
import { serviceEntity } from '../../../serviceEntity/serviceEntity';
@Component({
  selector: 'app-service-cate',
  templateUrl: './service-cate.component.html',
  styleUrls: ['./service-cate.component.css']
})
export class ServiceCateComponent implements OnInit {
@Input() inputService: serviceEntity = new serviceEntity();
  constructor() { }

  ngOnInit() {
  }

}

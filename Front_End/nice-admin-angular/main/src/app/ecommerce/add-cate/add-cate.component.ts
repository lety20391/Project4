import { Component, OnInit } from '@angular/core';
import {CategoryEntity} from '../category/CategoryEntity';

@Component({
  selector: 'app-add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.css']
})
export class AddCateComponent implements OnInit {

  detailedCategory: CategoryEntity = {
        CateID: 1,
        CateName: 'Food'
    };

  constructor() { }

  ngOnInit() {
  }

}

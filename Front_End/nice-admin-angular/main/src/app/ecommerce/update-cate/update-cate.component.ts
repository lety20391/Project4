import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryEntity } from '../Entity/CategoryEntity';


@Component({
  selector: 'app-update-cate',
  templateUrl: './update-cate.component.html',
  styleUrls: ['./update-cate.component.css']
})
export class UpdateCateComponent implements OnInit {


  // detailedCategory: CategoryEntity = {
  //       CateID: 1,
  //       CateName: 'Food'
  //   };


  constructor() { }

  ngOnInit() {
  }

}

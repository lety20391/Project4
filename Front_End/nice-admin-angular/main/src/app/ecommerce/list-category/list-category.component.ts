import { Component, OnInit } from '@angular/core';
import {CategoryEntity} from '../cate/CategoryEntity';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  // listCategory: CategoryEntity[] = [
  //   {
  //     CateID: 1,
  //     CateName: 'Food',
  //
  //   },
  //   {
  //     CateID: 2,
  //     CateName: 'Toy',
  //
  //   },
  //   {
  //     CateID: 3,
  //     CateName: 'Outfit',
  //
  //   }
  //
  // ];
  constructor() { }

  ngOnInit() {
  }



}

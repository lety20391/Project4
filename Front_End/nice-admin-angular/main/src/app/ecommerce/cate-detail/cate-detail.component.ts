import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {CategoryEntity} from '../category/CategoryEntity';

@Component({
  selector: 'app-cate-detail',
  templateUrl: './cate-detail.component.html',
  styleUrls: ['./cate-detail.component.css']
})
export class CateDetailComponent implements OnInit {
  detailedCategory: CategoryEntity = {
    CateID: 1,
    CateName: 'Food'
  };

  constructor(
              private route: ActivatedRoute,
              private location: Location

              ) { }

  ngOnInit() {
          this.getID();
        }

    getID(): void{
                  const id = +this.route.snapshot.paramMap.get('id');
                  console.log('---Fetch Category Detail: ' + id);
                }

}

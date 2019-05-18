import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PetEntity } from '../PetEntity';
import { PetManageService } from '../pet-manage.service';
import { DatingDetailEntity } from '../DatingDetailEntity';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.css']
})
export class DetailRequestComponent implements OnInit {

  logClass = '--Request Detail UI: ';

  @Input() currentDating: DatingDetailEntity = new DatingDetailEntity();

  constructor() { }

  ngOnInit() {
    this.initBasicData();
  }

  initBasicData():void{
    if( this.currentDating.petRequestEntity == null){
      this.currentDating.petRequestEntity = new PetEntity();
      this.currentDating.petRequestEntity.petListImage = [];
    }
  }

}

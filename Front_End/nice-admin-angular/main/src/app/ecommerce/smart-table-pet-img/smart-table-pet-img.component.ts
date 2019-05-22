import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-smart-table-pet-img',
  templateUrl: './smart-table-pet-img.component.html',
  styleUrls: ['./smart-table-pet-img.component.css']
})
export class SmartTablePetImgComponent implements OnInit {

  logClass = '--SmartTablePetImg: ';
  renderValue: string;
  isActive: boolean = false;
  currentID: number = 0;

  @Input() value: string | number;
  //@Input() value: boolean;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.createRenderValue();
  }

  createRenderValue():void{
    const imgURL = 'http://localhost:9090/uploadedFiles/Pet' + this.value;
    this.renderValue = imgURL;

    //cat lay ID tu trong value vi trong product.component minh da ghep chuoi thanh
    //dang ID/hinh.jpg vi du  2/abc.jpg
    //su dung lenh split se thanh -> '' , '2' , 'abc.jpg'
    //nen minh se lay phan tu [1]
    this.currentID = Number( this.value.toString().split('/')[1] );
  }

}

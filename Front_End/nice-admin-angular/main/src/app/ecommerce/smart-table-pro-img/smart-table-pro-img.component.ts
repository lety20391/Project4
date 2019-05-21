import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-smart-table-pro-img',
  templateUrl: './smart-table-pro-img.component.html',
  styleUrls: ['./smart-table-pro-img.component.css']
})
export class SmartTableProImgComponent implements OnInit {

  logClass = '--SmartTableProImg: ';
  renderValue: string;
  isActive: boolean = false;

  @Input() value: string | number;
  //@Input() value: boolean;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.createRenderValue();
  }

  createRenderValue():void{
    const imgURL = 'http://localhost:9090/uploadedFiles/Product' + this.value;
    this.renderValue = imgURL;
  }

}

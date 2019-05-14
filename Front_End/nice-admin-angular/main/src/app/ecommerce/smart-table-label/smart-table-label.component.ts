import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-smart-table-label',
  templateUrl: './smart-table-label.component.html',
  styleUrls: ['./smart-table-label.component.css']
})
export class SmartTableLabelComponent implements ViewCell, OnInit {

  logClass = '--SmartTableLabel: ';
  renderValue: string;
  isActive: boolean = false;

  @Input() value: string | number;
  //@Input() value: boolean;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    //this.renderValue = this.value.toString().toUpperCase();
    this.createLabel();
  }

  createLabel(): void{
    console.log(this.logClass + ' value:' + this.value);
    if (this.value.toString() == 'true'){
      this.isActive = true;
      this.renderValue = 'Active';
    }
    else
      this.renderValue = 'Deactive';
  }

  onClick() {
    this.rowData.status = !this.rowData.status;
    this.isActive = !this.isActive;
    if (this.isActive == true)
      this.renderValue = 'Active';
    else this.renderValue = 'Deactive';

    this.save.emit(this.rowData);
  }

}

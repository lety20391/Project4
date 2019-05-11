import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DatingDetailEntity} from '../DatingDetailEntity';

@Component({
  selector: 'app-dating-request',
  templateUrl: './dating-request.component.html',
  styleUrls: ['./dating-request.component.css']
})
export class DatingRequestComponent implements OnInit {
  logClass= '--Dating Request Component: ';

  @Input() ID_urlImg1 = 'http://localhost:9090/assets/dummy-img-400x400.jpg';
  @Input() ID_urlImg2 = 'http://localhost:9090/assets/dummy-img-400x400.jpg';

  receivedData: DatingDetailEntity = new DatingDetailEntity();

  constructor(
    private dialogRef: MatDialogRef<DatingRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {  }

  ngOnInit() {
    this.getInjectedData();
  }

  getInjectedData(): void{
    console.log(this.logClass + ' data received: ' +  JSON.stringify(this.data));
    this.receivedData = JSON.parse(JSON.stringify(this.data));
    console.log(this.logClass + ' url1: ' + this.receivedData.petRequestEntity.petListImage[0] );
    this.ID_urlImg1 = this.receivedData.petRequestEntity.petID + '/' +  this.receivedData.petRequestEntity.petListImage[0];
    this.ID_urlImg2 = this.receivedData.petRecieveEntity.petID + '/' +  this.receivedData.petRecieveEntity.petListImage[0];
  }

  save() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}

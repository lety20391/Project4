import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
    }

}

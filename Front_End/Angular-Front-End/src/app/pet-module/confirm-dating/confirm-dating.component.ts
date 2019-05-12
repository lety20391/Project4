import { Component, OnInit, Input } from '@angular/core';
import {DatingDetailEntity} from '../DatingDetailEntity';

@Component({
  selector: 'app-confirm-dating',
  templateUrl: './confirm-dating.component.html',
  styleUrls: ['./confirm-dating.component.css']
})
export class ConfirmDatingComponent implements OnInit {

  @Input() currentDating: DatingDetailEntity = new DatingDetailEntity();
  @Input() listDating: DatingDetailEntity[] = [];

  constructor() { }

  ngOnInit() {
  }

}

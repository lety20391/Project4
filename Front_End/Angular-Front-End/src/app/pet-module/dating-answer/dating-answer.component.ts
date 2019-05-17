import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DatingDetailEntity} from '../DatingDetailEntity';
import {PetEntity} from '../PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import {UrlAPIEntity} from '../../UrlAPIEntity';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dating-answer',
  templateUrl: './dating-answer.component.html',
  styleUrls: ['./dating-answer.component.css']
})
export class DatingAnswerComponent implements OnInit {

  @Output() selectedAnswer = new EventEmitter();
  @Input() listAnswer: DatingDetailEntity[] = [];

  logClass='--Dating Answer: ';
  urlAPI: UrlAPIEntity = new UrlAPIEntity();

  constructor() { }

  ngOnInit() {
  }

  sendCurrentAnswer(currentAnswer: DatingDetailEntity): void{
    console.log(this.logClass + ' sendCurrentDating from:' + currentAnswer.petRequestEntity.petName);
    this.selectedAnswer.emit(currentAnswer);
  }

}

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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    //this.getAllPetImageForListAnswer();
  }

  // getAllPetImageForListAnswer(): void{
  //   //neu listAnswer chua co du lieu thi khong load image
  //   if (this.listAnswer.length == 0)
  //     return;
  //   //neu listAnswer co du lieu thi moi load image
  //   console.log(this.logClass + " getImagePath");
  //   this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
  //   console.log(this.logClass + this.urlAPI.path);
  //
  //   //goi len server de lay danh sach hinh anh ve
  //   this.listAnswer.forEach(
  //     item => {
  //             this.http.get<string[]>(this.urlAPI.path + '/Pet/' + item.petRecieveEntity.petID)
  //             .subscribe(
  //               result => {
  //                           console.log(this.logClass + ' Image Load:' + result);
  //                           //gan ket qua tra ve vao thuoc tinh petListImage
  //                           item.petRecieveEntity.petListImage = result;
  //                         }
  //             );
  //     }
  //   );
  //
  // }

  sendCurrentAnswer(currentAnswer: DatingDetailEntity): void{
    console.log(this.logClass + ' sendCurrentDating from:' + currentAnswer.petRequestEntity.petName);
    this.selectedAnswer.emit(currentAnswer);
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {DatingDetailEntity} from '../DatingDetailEntity';
import {PetEntity} from '../PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import {UrlAPIEntity} from '../../UrlAPIEntity';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-dating',
  templateUrl: './confirm-dating.component.html',
  styleUrls: ['./confirm-dating.component.css']
})
export class ConfirmDatingComponent implements OnInit {

  @Output() selectedDating = new EventEmitter();
  @Output() changeDating = new EventEmitter();
  @Input() listDating: DatingDetailEntity[] = [];

  logClass='--Confirmation dating: ';
  urlAPI: UrlAPIEntity = new UrlAPIEntity();

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    //heart.js la javascript de chay icon hinh trai tim
    this.loadScript('./assets/js/heart.js');
    //this.getUserImage();
  }

  //load external js file into component
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  // getUserImage():void{
  //   console.log(this.logClass + " Get All Image");
  //   if (this.listDating.length == 0)
  //     return;
  //   this.listDating.forEach(
  //     dating => {
  //
  //       let id = dating.petRequestEntity.userEntity.userID;
  //       console.log(this.logClass + ' get All Image for user' + id);
  //       this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
  //       this.http.get<string[]>(this.urlAPI.path + '/User/' + id)
  //       .subscribe(
  //         result => {
  //                     console.log(this.logClass + ' Image Load');
  //                     dating.petRequestEntity.userEntity.listUserImage = result;
  //                   }
  //       );
  //     }
  //   );


  //}

  heartClicked(index: number): void{
    //kiem tra neu specialStatus = 1 nghia la Request nay da duoc tra loi 1 lan
    //khong cho tra loi them lan thu 2
    if(this.listDating[index].specialStatus == 1 )
      return;
    this.listDating[index].isAccepted = !this.listDating[index].isAccepted;
    this.listDating[index].specialStatus = 1;
    console.log(this.logClass + ' heartClicked: ' + this.listDating[index].petRequestEntity.petName);
    this.sendCurrentDating(this.listDating[index]);
  }

  cancelThisRequest(index: number): void{
    console.log(this.logClass + ' Cancel Dating for: ' + this.listDating[index].petRequestEntity.petName);

    //an Tag dating chuan bi cancle tren giao dien UI
    let needDisableTag = this.elementRef.nativeElement.querySelector('#collapse' + index);
    needDisableTag.classList.remove("show");

    //gan specialStatus = 3 va update len component list-pet
    //component list-pet se update du lieu len backend
    this.listDating[index].specialStatus = 3;
    this.listDating[index].isNewNotification = true;
    this.changeDating.emit(this.listDating[index]);
  }

  change2OldMess(index: number): void{
    console.log(this.logClass + ' change 2 Old Dating for: ' + this.listDating[index].petRequestEntity.petName);
    this.listDating[index].isNewNotification = false;
    this.changeDating.emit(this.listDating[index]);
  }

  sendCurrentDating(currentDating: DatingDetailEntity): void{
    console.log(this.logClass + ' sendCurrentDating from:' + currentDating.petRequestEntity.petName);
    this.selectedDating.emit(currentDating);
  }

}

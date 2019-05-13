import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() listDating: DatingDetailEntity[] = [];

  logClass='--Confirmation dating: ';
  urlAPI: UrlAPIEntity = new UrlAPIEntity();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
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
    this.listDating[index].isAccepted = !this.listDating[index].isAccepted;
    console.log(this.logClass + ' heartClicked: ' + this.listDating[index].petRequestEntity.petName);
    this.sendCurrentDating(this.listDating[index]);
  }

  sendCurrentDating(currentDating: DatingDetailEntity): void{
    console.log(this.logClass + ' sendCurrentDating from:' + currentDating.petRequestEntity.petName);
    this.selectedDating.emit(currentDating);
  }

}

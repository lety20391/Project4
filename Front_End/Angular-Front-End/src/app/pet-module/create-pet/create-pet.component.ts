import { Component, OnInit } from '@angular/core';
import { UploadComponent } from '../../UIComponent/upload/upload.component';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {
  uploadUrl = 'http://localhost:34828/ServicePRJ-web/';
  UrlEntity: UrlAPIEntity;
  inputID = '';
  jwtHeader = new HttpHeaders().set("Content-Type", "multipart/form-data");
  constructor() { }

  ngOnInit() {
    this.getUrl(5);
  }

  getUrl(code: string): void{
    //code will be use to create image Folder on server
    console.log("------Create Pet: getUrl() ------");

    //change your url name here
    this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
    this.uploadUrl = this.UrlEntity.path + "/file/" + code;
    console.log(this.uploadUrl);
  }

  sendID(){
    this.getUrl(this.inputID);
  }
}

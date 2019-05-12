import { Component, OnInit, Input } from '@angular/core';
import { UploadComponent } from '../../UIComponent/upload/upload.component';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetManageService} from '../pet-manage.service';
import { PetEntity } from '../PetEntity';
import {UserEntity} from '../../UserEntity/UserEntity';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {

  logClass = '--CreatePetComponent: ';
  uploadUrl = '';
  UrlEntity: UrlAPIEntity;
  inputID: number;
  genderList = ['Male', 'Female'];
  //jwtHeader = new HttpHeaders().set("Authorization", "multipart/form-data");
  @Input() newPet: PetEntity = new PetEntity();
  isReadyToUploadImage = false;
  @Input() buttonTitle = 'Upload Pet Info';
  @Input() isInUpdateMode = false;

  constructor(
    private petService: PetManageService
  ) { }

  ngOnInit() {
    //this.getUrl('5');
  }

  getUrl(code: number): void{
    //code will be use to create image Folder on server
    console.log("------Create Pet: getUrl() ------");

    //change your url name here
    this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
    this.uploadUrl = this.UrlEntity.path + "/file/" + "Pet/" + code;
    console.log(this.uploadUrl);
  }

  sendID(){
    this.getUrl(this.inputID);
  }

  createPetInfo(): void{
    console.log(this.logClass + " creatPet()");
    console.log(this.logClass + this.newPet.petGender);
    //getCurrent DateTime - test
    // let currentDate = new Date();
    // let stringDate = '';
    // stringDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(currentDate, 'hh:mm:ss', 'en-US');
    //
    // console.log(this.logClass + "date: " + stringDate);
    // this.newPet.petDOB = stringDate;

    //reformat DOB DateTime again
    let pickedDOB = this.newPet.petDOB;
    pickedDOB = formatDate(pickedDOB, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(pickedDOB, 'hh:mm:ss', 'en-US');
    console.log(this.logClass + ' DOB:' + pickedDOB);
    this.newPet.petDOB = pickedDOB;

    this.newPet.userEntity = new UserEntity();
    this.newPet.userEntity.userID = 1;
    this.petService.createNewPetInfo(this.newPet).subscribe(
      //day la doan lay Response tra ve
      response => {
                    console.log('HTTP response', response);
                    let returnPet = response;
                    if (returnPet.petID != null){
                      this.getUrl(returnPet.petID);
                      this.isReadyToUploadImage = true;
                    }
                  },

      //day la doan bi loi
      err => {
        console.log('HTTP Error', err.status);
        console.log('ABCxyz');
      },

      //day la doan mac dinh
      () => console.log('HTTP request completed.')
    );
  }
}

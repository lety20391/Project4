import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../Entity/PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {JWTHeaderService} from '../../jwtheader.service';
import { ImageServiceService } from '../image-service.service';
import { DatePipe, formatDate } from '@angular/common';
import { UserEntity } from '../Entity/UserEntity';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  newPet: PetEntity = new PetEntity();
  urlAPI: UrlAPIEntity;
  logClass = '--List Pet Component: ';
  isReadyToUploadImage: boolean = false;
  UrlEntity: UrlAPIEntity;
  uploadUrl: string = '';

  constructor(
    private http: HttpClient,
    private imageService: ImageServiceService,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
  }

  createPetInfo(): void{
    console.log(this.logClass + " add Pet()");
    console.log(this.logClass + this.newPet.petGender);
    //getCurrent DateTime - test
    // let currentDate = new Date();
    // let stringDate = '';
    // stringDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(currentDate, 'hh:mm:ss', 'en-US');
    //
    // console.log(this.logClass + "date: " + stringDate);
    // this.newPet.petDOB = stringDate;

    //reformat DOB DateTime again
    // let pickedDOB = this.newPet.petDOB;
    // pickedDOB = formatDate(pickedDOB, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(pickedDOB, 'hh:mm:ss', 'en-US');
    // console.log(this.logClass + ' DOB:' + pickedDOB);
    // this.newPet.petDOB = pickedDOB;

    this.newPet.userEntity = new UserEntity();
    this.newPet.userEntity.userID = Number(localStorage.getItem('UserID'));

    //prepare Url
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    this.http.post<PetEntity>(this.urlAPI.path + '/Post' , this.newPet, { headers: headers}).subscribe(
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

  getUrl(code: number): void{
    //code will be use to create image Folder on server
    console.log("------Create Pet: getUrl() ------");

    //change your url name here
    this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
    this.uploadUrl = this.UrlEntity.path + "/file/" + "Pet/" + code;
    console.log(this.uploadUrl);
  }

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}

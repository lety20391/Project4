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
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { UploadAdapter } from '../UploadAdapter/upload-adapter';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  adapter: UploadAdapter;
  isReadyToUploadImage: boolean = false;
  newPet: PetEntity = new PetEntity();
  urlAPI: UrlAPIEntity;
  logClass = '--List Pet Component: ';
  // isReadyToUploadImage: boolean = false;
  UrlEntity: UrlAPIEntity;
  uploadUrl: string = '';
  genderList = ['Male', 'Female'];

  //***********************
  //*** bat loi DOB********
  //***********************
  // Min moment: Today - 20 year
    public minDate : Date;

    // Max moment: Today - 6 month
    public maxDate : Date;


  constructor(
    private http: HttpClient,
    private imageService: ImageServiceService,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.loadScript('./assets/js/cropper.js');
    this.prepareDate();
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

  prepareDate(): void{
    //ngay min la 20 nam truoc
    //ngay max la 1 thang truoc

    let tempDateInSecond = new Date().getTime();
    //tru di 20 * 365 ngay ( 20 * 365 * 24 * 3600) vao tempDate hien tai
    tempDateInSecond -= 20* 365 * 24 * 3600 * 1000;
    this.minDate = new Date(tempDateInSecond);

    tempDateInSecond = new Date().getTime();
    //tru di 1 * 30 ngay ( 1 * 30 * 24 * 3600) vao tempDate hien tai
    tempDateInSecond -= 1 * 30 * 24 * 3600 * 1000;
    this.maxDate = new Date(tempDateInSecond);


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
    let pickedDOB = this.newPet.petDOB;
    pickedDOB = formatDate(pickedDOB, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(pickedDOB, 'hh:mm:ss', 'en-US');
    console.log(this.logClass + ' DOB:' + pickedDOB);
    this.newPet.petDOB = pickedDOB;

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
                      // this.getUrl(returnPet.petID);
                      this.isReadyToUploadImage = true;
                      //prepare Url
                      this.urlAPI = listUrlAPI.find(url => url.name === 'uploadResource');
                      this.urlAPI.path += "/file/" + "Pet/" + returnPet.petID;
                      console.log(this.logClass + this.urlAPI.path);

                      this.adapter = new UploadAdapter(this.http, this.urlAPI.path );
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

  // getUrl(code: number): void{
  //   //code will be use to create image Folder on server
  //   console.log("------Create Pet: getUrl() ------");
  //
  //   //change your url name here
  //   this.UrlEntity = listUrlAPI.find(url => url.name === 'uploadResource');
  //   this.uploadUrl = this.UrlEntity.path + "/file/" + "Pet/" + code;
  //   console.log(this.uploadUrl);
  // }
  oneFileUploadSuccess(event: any): void{
    alert('**File: ' + JSON.stringify(event.fileName) + ' UPLOAD SUCCESSFULLY**');
  }

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}

import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../Entity/PetEntity';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {JWTHeaderService} from '../../jwtheader.service';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.css']
})
export class ListPetComponent implements OnInit {

  // listPet: PetEntity[] =[
  //   {
  //       PetID: 1,
  //       PetName: 'Min',
  //       PetBreed: 'Foxie',
  //       PetImage: '',
  //       PetStatus: true,
  //       PetPrice: 29,
  //       PetDOB: '12-12-2017'
  //   },
  //   {
  //       PetID: 2,
  //       PetName: 'Coongy',
  //       PetBreed: 'Cogy',
  //       PetImage: '',
  //       PetStatus: true,
  //       PetPrice: 39,
  //       PetDOB: '12-12-2018'
  //   }
  // ];

  listPet: PetEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--List Pet Component: ';

  constructor(
    private http: HttpClient,
    private imageService: ImageServiceService,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllPetList();
  }

  getAllPetList(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
      console.log(this.logClass + this.urlAPI.path)

      //prepare headers
      let headers = this.createHeader();

      this.http.get<HttpResponse<PetEntity[]>>(this.urlAPI.path + "/list",  { headers: headers , observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listPet = JSON.parse(JSON.stringify(response.body));

                //lay du lieu Image tu server
                this.listPet.forEach(
                  item => {
                    this.imageService.getAllImage(item.petID, 'Pet')
                      .subscribe(
                        result => {
                          item.petListImage = JSON.parse(JSON.stringify(result));
                        }
                      );

                  }
                );

              }
              // if (response.status == 200){
              //   this.isLogined = true;
              //   console.log( response.headers.get('Authorization') );
              //   let auth = response.headers.get('Authorization');
              //   this.jwtService.addJWT(auth);
              //   console.log('Get jwt: ' + this.jwtService.getJWT());
              // }else{
              //   this.pass = 'Please Enter Code Again';
              // }

            }
      );
  }

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}

import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../Entity/PetEntity';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import { ProductEntity } from '../Entity/ProductEntity';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.css']
})
export class DetailPetComponent implements OnInit {

  currentPetID: number;
  urlAPI: UrlAPIEntity;
  logClass = '--Detail Pet Ecommerce: ';
  currentPet: PetEntity = new PetEntity();
  isShowPet: boolean = false;

  constructor(
              private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient,
              private jwtService: JWTHeaderService
              ) { }

  ngOnInit() {
          this.getID();
          this.getPetByID(this.currentPetID);
          }

    getID(): void{
              this.currentPetID = +this.route.snapshot.paramMap.get('id');
              console.log('---Fetch pet Detail: ' + this.currentPetID);
            }

    getPetByID(id: number): void{
      console.log(this.logClass + " init");
        this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
        console.log(this.logClass + this.urlAPI.path);

        //prepare headers
        let headers = this.createHeader();

        this.http.get<HttpResponse<ProductEntity[]>>(this.urlAPI.path + '/getDetail/findID/' + id,  { headers: headers , observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  this.currentPet = JSON.parse(JSON.stringify(response.body));

                  this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                  console.log(this.logClass + this.urlAPI.path);
                  //prepare headers
                  let headers = this.createHeader();

                  this.http.get<string[]>(this.urlAPI.path + '/Pet/' + this.currentPet.petID , {headers: headers})
                    .subscribe(
                        response => {
                              console.log(this.logClass + ' get All Pet Image: ' + JSON.stringify(response));
                              this.currentPet.petListImage = JSON.parse(JSON.stringify(response));
                              this.isShowPet = true;
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

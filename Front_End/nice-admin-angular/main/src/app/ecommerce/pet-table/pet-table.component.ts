import { Component, OnInit } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';

import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import {SmartTableLabelComponent} from '../smart-table-label/smart-table-label.component';
import { ProductEntity } from '../Entity/ProductEntity';
import { SmartTableProImgComponent } from '../smart-table-pro-img/smart-table-pro-img.component';
import { PetEntity } from '../Entity/PetEntity';
import { SmartTablePetImgComponent } from '../smart-table-pet-img/smart-table-pet-img.component';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
})
export class PetTableComponent implements OnInit {
  settings = {
              columns: {
                    petID: {
                      title: 'ID',
                      editable: false,
                      width: '20px',
                    },
                    petSingleImage:{
                      title: 'Image',
                      type: 'custom',
                      renderComponent: SmartTablePetImgComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert(`${row.proColor} test!`);
                                          //localStorage.setItem('changedProductID', `${row.proID}`);
                                        }
                                    );

                              }
                    },
                    petName: {
                      title: 'Name',
                      width: '15%',
                    },
                    petBreed: {
                      title: 'Breed'
                    },
                    petPrice: {
                      title: 'Price',
                      width: '100px',
                      sort : true,
                    },
                    petDOB:{
                      title: 'DOB'
                    },
                    petDating:{
                      title: 'Dating',
                      editable: false,
                      width: '100px',
                      type: 'custom',
                      renderComponent: SmartTableLabelComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert(`${row.proColor} test!`);
                                          //localStorage.setItem('changedPetID', `${row.petID}`);
                                          //alert(`${row.petID}`);
                                          localStorage.setItem('changedPetID', `${row.petID}`);
                                          localStorage.setItem('changedPetDatingID', `${row.petID}`);
                                        }
                                    );

                              }

                    },
                    petGender:{
                      title: 'Gender'
                    },

                    petStory:{
                      title: 'Story'
                    },

                    status:{
                      title: 'Status',
                      editable: false,
                      width: '100px',
                      type: 'custom',
                      renderComponent: SmartTableLabelComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert(`${row.proColor} test!`);
                                          //alert(`${row.status}`);
                                          localStorage.setItem('changedPetID', `${row.petID}`);
                                        }
                                    );

                              }
                    }

                  },
                  edit: {
                    confirmSave: true,
                    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
                    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
                    cancelButtonContent: '<i class="ti-close text-danger"></i>'
                  },
                  delete: {
                    confirmDelete: true,
                    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
                    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
                    cancelButtonContent: '<i class="ti-close text-danger"></i>'
                  },
                  add: {confirmCreate: true},
                  mode: 'inline'
            };
  listPet: PetEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Product Component: ';
  tempPet: PetEntity = new PetEntity();
  isShowTable: boolean = false;

  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllPetList();
  }

  getAllPetList(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
      console.log(this.logClass + this.urlAPI.path);

      //prepare header
      let headers = this.createHeader();

      this.http.get<HttpResponse<ProductEntity[]>>(this.urlAPI.path + "/list",  {headers: headers, observe: 'response' })
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

                //lay hinh ve
                let index: number = 0;
                this.listPet.forEach(
                      item => {

                        this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                        console.log(this.logClass + this.urlAPI.path);

                        this.http.get<string[]>(this.urlAPI.path + '/Pet/' + item.petID, {headers: headers})
                          .subscribe(
                                  result => {
                                    let tempImgList = JSON.parse(JSON.stringify(result));
                                    //lay 1 hinh lam mau cho petImage
                                    //them petID vao Img de lay hinh
                                    //vi du: /1/ab
                                    if(tempImgList instanceof Array){
                                      item.petSingleImage= '/' + item.petID + '/' + tempImgList[0];
                                      console.log(this.logClass + ' link Pet Img: ' + item.petSingleImage);
                                    }

                                    item.status = item.petStatus;

                                    index += 1;
                                    if( index == this.listPet.length){
                                      this.isShowTable = true;
                                      index = 0;
                                    }

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

  selectedPetRow(event: any): void{
    console.log(this.logClass + ' selected Row:' + JSON.stringify(event.data));
    //lay ID tu localStorage de  kiem tra xem co phai day la update status khong
    let stringID = localStorage.getItem('changedPetID');
    if(stringID != null && stringID != ''){
      if(JSON.stringify(event.data.petID) == stringID){
        //update Status
        console.log(this.logClass + 'update row' + JSON.stringify(event.data));
        this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
        console.log(this.logClass + this.urlAPI.path);

        //prepare headers
        let headers = this.createHeader();


        //************************************
        //khuc nay chi danh rieng cho bang Pet
        //************************************
        //kiem tra neu trong localStorage co changedPetDatingID nghia la dang change Dating
        if(localStorage.getItem('changedPetDatingID') != null && localStorage.getItem('changedPetDatingID') != ''){
            console.log(this.logClass + ' dao nguoc trang thai');
            //dao nguoc lai status va petStatus
            event.data.status = !event.data.status;
            event.data.petDating = !event.data.petDating;
        }else{
          //doi status thanh petStatus
          event.data.petStatus = event.data.status;
        }
        //************************************
        //khuc nay chi danh rieng cho bang Pet
        //************************************

        //update Database
        this.http.put<HttpResponse<PetEntity>>(this.urlAPI.path + '/update' , event.data ,{ headers: headers, observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  localStorage.setItem('changedPetID', '');

                  //************************************
                  //khuc nay chi danh rieng cho bang Pet
                  //************************************
                  if(localStorage.getItem('changedPetDatingID') != null && localStorage.getItem('changedPetDatingID') != ''){
                    localStorage.setItem('changedPetDatingID', '');
                  }
                  //************************************
                  //khuc nay chi danh rieng cho bang Pet
                  //************************************

                  //update data source trong bang
                  event.source.update(event.data);


                }


              }
        );


      }
    }

  }

  updatePetRow(event: any): void{
    this.tempPet = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' updated Product' + JSON.stringify(this.tempPet));
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
    console.log(this.logClass + this.urlAPI.path);

    //update Local listProduct
    event.confirm.resolve(event.newData);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path +'/update' , event.newData ,{ headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));

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

  deleteRow(event: any): void {
    this.tempPet = JSON.parse(JSON.stringify(event.data));
    console.log(this.logClass + ' delete Product' + JSON.stringify(this.tempPet));
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
    console.log(this.logClass + this.urlAPI.path);

    //update Local listProduct
    event.confirm.resolve();

    //prepare headers
    let headers = this.createHeader();

    //update Database
    //delete is just update status form True to False
    this.tempPet.petStatus = false;
    this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path +'/update', this.tempPet , { headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              console.log(JSON.stringify(response.body));
              this.isShowTable = false;
              this.getAllPetList();

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

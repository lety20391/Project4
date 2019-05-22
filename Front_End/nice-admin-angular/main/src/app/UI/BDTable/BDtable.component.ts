import { Component } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';

import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ServiceManageService} from '../Service/service-manage.service';
import {JWTHeaderService} from '../../jwtheader.service';
import {SmartTableLabelComponent} from '../../ecommerce/smart-table-label/smart-table-label.component';
import { BookingDetailEntity } from '../../Booking/BookingDetailEntity';
import { SmartTableProImgComponent } from '../../ecommerce/smart-table-pro-img/smart-table-pro-img.component';

@Component({
  templateUrl: 'BDtable.component.html'
})
export class BDtableComponent {
  settings = {
              columns: {
                    bDetailID: {
                      title: 'ID',
                      editable: false,
                      width: '5%',
                    },
                    bookingDate: {
                      title: 'Date',
                      width: '15%',
                    },
                    message: {
                      title: 'Message',
                      width: '25%'
                    },
                    currentPet: {
                      title: 'Telephone',
                      width: '10%',
                      sort : true,
                    },

                    currentService:{
                      title: 'Service',
                      width:'15%',
                    },
                    // proImage:{
                    //   title: 'Image'
                    // },
                    status:{
                      title: 'Status',
                      editable: false,
                      width: '20%',
                      type: 'custom',
                      renderComponent: SmartTableLabelComponent,
                      onComponentInitFunction(instance) {
                                instance.save
                                  .subscribe(
                                      row => {
                                          //alert(`${row.proColor} test!`);
                                          localStorage.setItem('changedBookingDetailID', `${row.bDetailID}`);
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
                  actions: false,

                  mode: 'inline'
            };
  listBD: BookingDetailEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--BDtable Component: ';
  tempBD: BookingDetailEntity = new BookingDetailEntity();
  isShowTable: boolean = false;

  constructor(
    private service: ServiceManageService,
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllBDList();
  }

  getAllBDList(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
      console.log(this.logClass + this.urlAPI.path)


      let headers = this.createHeader();

      this.http.get<HttpResponse<BookingDetailEntity[]>>(this.urlAPI.path + "/getAll",  { headers: headers , observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listBD = JSON.parse(JSON.stringify(response.body));

                //lay hinh ve
                let index: number = 0;
                this.listBD.forEach(
                      item => {
                        item.currentPet = item.bookingMasterEntity.userEntity.userTel;
                        item.currentService = item.serviceEntity.serName;
                              //
                              index += 1;
                              if( index == this.listBD.length){
                                  this.isShowTable = true;
                                index = 0;
                              }
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

  selectedRow(event: any): void{
    console.log(this.logClass + ' selected Row:' + JSON.stringify(event.data));
    //lay ID tu localStorage de  kiem tra xem co phai day la update status khong
    let stringID = localStorage.getItem('changedBookingDetailID');
    if(stringID != null && stringID != ''){

      if(JSON.stringify(event.data.bDetailID) == stringID){
        console.log("success: "+ event.data.bDetailID);
        //update Status
        //prepare headers
        let headers = this.createHeader();

        //update Database
        this.http.put<HttpResponse<BookingDetailEntity>>(this.urlAPI.path , event.data ,{ headers: headers, observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  localStorage.setItem('changedBookingDetailID', '');

                  //update data source trong bang
                  event.source.update(event.data);


                }


              }
        );


      }
    }

  }

  // updateRow(event: any): void{
  //   this.tempProduct = JSON.parse(JSON.stringify(event.newData));
  //   console.log(this.logClass + ' updated Product' + JSON.stringify(this.tempProduct));
  //
  //   //update Local listProduct
  //   event.confirm.resolve(event.newData);
  //
  //   //prepare headers
  //   let headers = this.createHeader();
  //
  //   //update Database
  //   this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path , event.newData ,{ headers: headers, observe: 'response' })
  //     .subscribe(
  //         response => {
  //           console.log( response);
  //           console.log( response.status );
  //           if (response.status == 200){
  //             console.log(this.logClass + " response: " + response);
  //             //chuyen du lieu tu response.body ve lai kieu array
  //             //roi gan vao listPet
  //             console.log(JSON.stringify(response.body));
  //
  //           }
  //           // if (response.status == 200){
  //           //   this.isLogined = true;
  //           //   console.log( response.headers.get('Authorization') );
  //           //   let auth = response.headers.get('Authorization');
  //           //   this.jwtService.addJWT(auth);
  //           //   console.log('Get jwt: ' + this.jwtService.getJWT());
  //           // }else{
  //           //   this.pass = 'Please Enter Code Again';
  //           // }
  //
  //         }
  //   );
  //
  // }
  //
  // deleteRow(event: any): void {
  //   this.tempProduct = JSON.parse(JSON.stringify(event.data));
  //   console.log(this.logClass + ' delete Product' + JSON.stringify(this.tempProduct));
  //
  //   //update Local listProduct
  //   event.confirm.resolve();
  //
  //   //prepare headers
  //   let headers = this.createHeader();
  //
  //   //update Database
  //   //delete is just update status form True to False
  //   this.tempProduct.status = false;
  //   this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path , this.tempProduct , { headers: headers, observe: 'response' })
  //     .subscribe(
  //         response => {
  //           console.log( response);
  //           console.log( response.status );
  //           if (response.status == 200){
  //             console.log(this.logClass + " response: " + response);
  //             //chuyen du lieu tu response.body ve lai kieu array
  //             //roi gan vao listPet
  //             console.log(JSON.stringify(response.body));
  //
  //           }
  //           // if (response.status == 200){
  //           //   this.isLogined = true;
  //           //   console.log( response.headers.get('Authorization') );
  //           //   let auth = response.headers.get('Authorization');
  //           //   this.jwtService.addJWT(auth);
  //           //   console.log('Get jwt: ' + this.jwtService.getJWT());
  //           // }else{
  //           //   this.pass = 'Please Enter Code Again';
  //           // }
  //
  //         }
  //   );
  // }
  //
  // createRow(event: any): void{
  //   this.tempProduct = JSON.parse(JSON.stringify(event.newData));
  //   console.log(this.logClass + ' add Product' + JSON.stringify(this.tempProduct));
  //   //convert proPrice ve lai thanh integer
  //   this.tempProduct.proPrice = Number(this.tempProduct.proPrice);
  //
  //   //delete ID de cho Backend tu dong tao
  //   delete this.tempProduct.proID;
  //
  //   //update Local listProduct
  //   //waiting for Backend return newID
  //   //event.confirm.resolve();
  //
  //   //prepare headers
  //   let headers = this.createHeader();
  //
  //   //update Database
  //
  //   this.http.post<HttpResponse<ProductEntity>>(this.urlAPI.path , this.tempProduct , { headers: headers, observe: 'response' })
  //     .subscribe(
  //         response => {
  //           console.log( response);
  //           console.log( response.status );
  //           if (response.status == 200){
  //             console.log(this.logClass + " response: " + response);
  //             //chuyen du lieu tu response.body ve lai kieu array
  //             //roi gan vao listPet
  //             //console.log(JSON.stringify(response.body));
  //             let newProduct = JSON.parse(JSON.stringify(response.body));
  //             event.confirm.resolve(newProduct);
  //
  //           }
  //           // if (response.status == 200){
  //           //   this.isLogined = true;
  //           //   console.log( response.headers.get('Authorization') );
  //           //   let auth = response.headers.get('Authorization');
  //           //   this.jwtService.addJWT(auth);
  //           //   console.log('Get jwt: ' + this.jwtService.getJWT());
  //           // }else{
  //           //   this.pass = 'Please Enter Code Again';
  //           // }
  //
  //         }
  //   );
  // }
  //


  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}

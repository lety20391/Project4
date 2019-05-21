import { Component, OnInit } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import {SmartTableLabelComponent} from '../smart-table-label/smart-table-label.component';
import { CategoryEntity } from '../Entity/CategoryEntity';

@Component({
  selector: 'app-cate',
  templateUrl: './cate.component.html',
  styleUrls: ['./cate.component.css']
})
export class CateComponent implements OnInit {

  settings = {
              columns: {
                    cateID: {
                      title: 'ID',
                      editable: false,
                      width: '20px',
                    },
                    cateName: {
                      title: 'Name',
                      width:'70%'
                    },
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
                                          localStorage.setItem('changedCateID', `${row.cateID}`);
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
  listCategory: CategoryEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Category Component: ';
  tempCategory: CategoryEntity = new CategoryEntity();

  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllCategoryList();
  }

  getAllCategoryList(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'categoryResource');
      console.log(this.logClass + this.urlAPI.path)

      //prepare headers
      let headers = this.createHeader();

      this.http.get<HttpResponse<CategoryEntity[]>>(this.urlAPI.path + "/list",  {headers: headers, observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listCategory = JSON.parse(JSON.stringify(response.body));

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
    let stringID = localStorage.getItem('changedCateID');
    if(stringID != null && stringID != ''){
      if(JSON.stringify(event.data.cateID) == stringID){
        //update Status
        //prepare headers
        let headers = this.createHeader();

        //update Database
        this.http.put<HttpResponse<CategoryEntity>>(this.urlAPI.path , event.data ,{ headers: headers, observe: 'response' })
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
    }

  }

  updateRow(event: any): void{
    this.tempCategory = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' updated category' + JSON.stringify(this.tempCategory));

    //update Local listProduct
    event.confirm.resolve(event.newData);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    this.http.put<HttpResponse<CategoryEntity>>(this.urlAPI.path , event.newData ,{ headers: headers, observe: 'response' })
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
    this.tempCategory = JSON.parse(JSON.stringify(event.data));
    console.log(this.logClass + ' delete Product' + JSON.stringify(this.tempCategory));

    //update Local listProduct
    event.confirm.resolve();

    //prepare headers
    let headers = this.createHeader();

    //update Database
    //delete is just update status form True to False
    this.tempCategory.status = false;
    this.http.put<HttpResponse<CategoryEntity>>(this.urlAPI.path , this.tempCategory , { headers: headers, observe: 'response' })
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

  createRow(event: any): void{
    this.tempCategory = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' add Product' + JSON.stringify(this.tempCategory));

    //delete ID de cho Backend tu dong tao
    delete this.tempCategory.cateID;

    //update Local listProduct
    //waiting for Backend return newID
    //event.confirm.resolve();

    //prepare headers
    let headers = this.createHeader();

    //update Database

    this.http.post<HttpResponse<CategoryEntity>>(this.urlAPI.path , this.tempCategory , { headers: headers, observe: 'response' })
      .subscribe(
          response => {
            console.log( response);
            console.log( response.status );
            if (response.status == 200){
              console.log(this.logClass + " response: " + response);
              //chuyen du lieu tu response.body ve lai kieu array
              //roi gan vao listPet
              //console.log(JSON.stringify(response.body));
              let newProduct = JSON.parse(JSON.stringify(response.body));
              event.confirm.resolve(newProduct);

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

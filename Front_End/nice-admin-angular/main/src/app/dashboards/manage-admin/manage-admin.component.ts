import { Component, OnInit } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';

import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {JWTHeaderService} from '../../jwtheader.service';
import { AdminEntity } from 'src/app/ecommerce/Entity/AdminEntity';
import { SmartTableLabelComponent } from 'src/app/ecommerce/ecom.module';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {

  settings = {
              columns: {
                    adminID: {
                      title: 'ID',
                      editable: false,
                      width: '20px',
                    },
                    userName: {
                      title: 'Name',
                      width: '15%',
                    },
                    userTel: {
                      title: 'Tel'
                    },
                    superAdmin: {
                      title: 'Is Super',
                      width: '100px',
                      sort : true,
                    },
                    // proColor:{
                    //   title: 'Color'
                    // },
                    // proImage:{
                    //   title: 'Image',
                    //   type: 'custom',
                    //   renderComponent: SmartTableProImgComponent,
                    //   onComponentInitFunction(instance) {
                    //             instance.save
                    //               .subscribe(
                    //                   row => {
                    //                       //alert(`${row.proColor} test!`);
                    //                       //localStorage.setItem('changedProductID', `${row.proID}`);
                    //                     }
                    //                 );
                    //
                    //           }
                    // },
                    // proImage:{
                    //   title: 'Image'
                    // },
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
                                          //localStorage.setItem('changedProductID', `${row.proID}`);
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
  listAdmin: AdminEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Product Component: ';
  tempAdmin: AdminEntity = new AdminEntity();
  isShowTable: boolean = false;

  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllAdmin();
  }

  getAllAdmin(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'adminResource');
      console.log(this.logClass + this.urlAPI.path)

      let headers = this.createHeader();

      this.http.get<HttpResponse<AdminEntity[]>>(this.urlAPI.path,  {headers: headers, observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listAdmin = JSON.parse(JSON.stringify(response.body));

                //lay hinh ve
                let index: number = 0;
                this.listAdmin.forEach(
                      item => {
                        let headers = this.createHeader();

                        this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
                        console.log(this.logClass + this.urlAPI.path);

                        this.http.get<string[]>(this.urlAPI.path + '/Admin/' + item.adminID, {headers: headers})
                          .subscribe(
                                  result => {
                                    let tempImgList = JSON.parse(JSON.stringify(result));
                                    //lay 1 hinh lam mau cho petImage
                                    //them petID vao Img de lay hinh
                                    //vi du: /1/ab
                                    if(tempImgList instanceof Array){
                                      item.image= '/' + item.adminID + '/' + tempImgList[0];
                                      console.log(this.logClass + ' link Pet Img: ' + item.image);
                                    }

                                    // item.status = item.petStatus;

                                    index += 1;
                                    if( index == this.listAdmin.length){
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

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}

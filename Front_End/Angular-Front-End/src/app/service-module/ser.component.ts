import { Component, OnInit } from '@angular/core';
import { serviceEntity } from '../serviceEntity/serviceEntity';
import { ServiceManageService } from './service-manage.service';
import { HttpResponse,HttpClient } from '@angular/common/http';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
@Component({
  selector: 'app-ser',
  templateUrl: './ser.component.html',
  styleUrls: ['./ser.component.css']
})
export class SerComponent implements OnInit {


  serTitle = 'Service';
  serviceContent = "Your pet's health and well-being are our top priority.";
  listService:  serviceEntity[]= [];
  urlAPI : UrlAPIEntity;
    logClass = '--list-service: ';
  constructor(
      private serviceManageService: ServiceManageService,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchService();
  }
  fetchService(): void{
    this.urlAPI = listUrlAPI.find(url => url.name === 'serviceResource');
    console.log(this.logClass + this.urlAPI.path)
      this.http.get<HttpResponse<Object[]>>(this.urlAPI.path + "/list",  { observe: 'response' })
      .subscribe(
      response => {
        console.log( response);
        console.log( response.status );
        if (response.status == 200){
          console.log(this.logClass + " response: " + response);
          //chuyen du lieu tu response.body ve lai kieu array
          //roi gan vao listPet
          console.log(JSON.stringify(response.body));
          this.listService = JSON.parse(JSON.stringify(response.body));

          //voi moi item trong danh sach Pet minh goi len server lay danh sach Image
          this.listService.forEach(
            item => {
              //khoi tao thuoc tinh petListImage vi thuoc tinh nay dang null
              item.serviceListImage = [];
              console.log(this.logClass + " getImagePath");
              this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
              console.log(this.logClass + this.urlAPI.path);

              //goi len server de lay danh sach hinh anh ve
              this.http.get<string[]>(this.urlAPI.path + '/Service/' + item.serID)
              .subscribe(
                result => {
                            console.log(this.logClass + ' Image Load:' + result);
                            //gan ket qua tra ve vao thuoc tinh petListImage
                            item.serviceListImage = result;
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

}

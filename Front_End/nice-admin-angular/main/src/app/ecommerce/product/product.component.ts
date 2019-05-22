import { Component } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';

import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {ProductServiceService} from '../product-service.service'
import {JWTHeaderService} from '../../jwtheader.service';
import {SmartTableLabelComponent} from '../smart-table-label/smart-table-label.component';
import { ProductEntity } from '../Entity/ProductEntity';
import { SmartTableProImgComponent } from '../smart-table-pro-img/smart-table-pro-img.component';

@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent {

  // listProduct: ProductEntity[] = [
  //   {
  //     proID: 1,
  //     proName: 'pink belt',
  //     proDes: 'real leather',
  //     proPrice: 12,
  //     proColor: 'red',
  //     proImage: '',
  //     status: true,
  //     cateEntity: {
  //                   CateID: 1,
  //                   CateName: 'Category1'
  //                 },
  //     proListImage: []
  //
  //   },
  //   {
  //     proID: 2,
  //     proName: 'def',
  //     proDes: 'real leather',
  //     proPrice: 24,
  //     proColor: 'yellow',
  //     proImage: '',
  //     status: true,
  //     cateEntity: {
  //                   CateID: 2,
  //                   CateName: 'Category2'
  //                 },
  //     proListImage: []
  //   }
  // ];

  // source: LocalDataSource;
  // source2: LocalDataSource;
  // constructor() {
  //   this.source = new LocalDataSource(tableData.data); // create the source
  //   this.source2 = new LocalDataSource(tableData.data); // create the source
  // }
  // settings = tableData.settings;
  // settings2 = tableData.settings2;
  settings = {
              columns: {
                    proID: {
                      title: 'ID',
                      editable: false,
                      width: '20px',
                    },
                    proName: {
                      title: 'Name',
                      width: '15%',
                    },
                    proDes: {
                      title: 'Description'
                    },
                    proPrice: {
                      title: 'Price',
                      width: '100px',
                      sort : true,
                    },
                    proColor:{
                      title: 'Color'
                    },
                    proImage:{
                      title: 'Image',
                      type: 'custom',
                      renderComponent: SmartTableProImgComponent,
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
                                          localStorage.setItem('changedProductID', `${row.proID}`);
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
  listProduct: ProductEntity[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Product Component: ';
  tempProduct: ProductEntity = new ProductEntity();
  isShowTable: boolean = false;

  constructor(
    private productService: ProductServiceService,
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getAllProductList();
  }

  getAllProductList(): void{
    console.log(this.logClass + " init");
      this.urlAPI = listUrlAPI.find(url => url.name === 'productResource');
      console.log(this.logClass + this.urlAPI.path)

      this.http.get<HttpResponse<ProductEntity[]>>(this.urlAPI.path + "/list",  { observe: 'response' })
        .subscribe(
            response => {
              console.log( response);
              console.log( response.status );
              if (response.status == 200){
                console.log(this.logClass + " response: " + response);
                //chuyen du lieu tu response.body ve lai kieu array
                //roi gan vao listPet
                console.log(JSON.stringify(response.body));
                this.listProduct = JSON.parse(JSON.stringify(response.body));

                //lay hinh ve
                let index: number = 0;
                this.listProduct.forEach(
                      item => {
                        this.productService.getAllProductImage(item.proID)
                          .subscribe(
                            result => {
                              let tempImgList = JSON.parse(JSON.stringify(result));
                              //lay 1 hinh lam mau cho proImage
                              //them proID vao Img de lay hinh
                              //vi du: /1/ab
                              if(tempImgList instanceof Array){
                                item.proImage= '/' + item.proID + '/' + tempImgList[0];
                                console.log(this.logClass + ' link Pro Img: ' + item.proImage);
                              }

                              index += 1;
                              if( index == this.listProduct.length){
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

  selectedRow(event: any): void{
    console.log(this.logClass + ' selected Row:' + JSON.stringify(event.data));
    //lay ID tu localStorage de  kiem tra xem co phai day la update status khong
    let stringID = localStorage.getItem('changedProductID');
    if(stringID != null && stringID != ''){
      if(JSON.stringify(event.data.proID) == stringID){
        //update Status
        //prepare headers
        let headers = this.createHeader();

        //update Database
        this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path , event.data ,{ headers: headers, observe: 'response' })
          .subscribe(
              response => {
                console.log( response);
                console.log( response.status );
                if (response.status == 200){
                  console.log(this.logClass + " response: " + response);
                  //chuyen du lieu tu response.body ve lai kieu array
                  //roi gan vao listPet
                  console.log(JSON.stringify(response.body));
                  localStorage.setItem('changedProductID', '');

                  //update data source trong bang
                  event.source.update(event.data);


                }


              }
        );


      }
    }

  }

  updateRow(event: any): void{
    this.tempProduct = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' updated Product' + JSON.stringify(this.tempProduct));

    //update Local listProduct
    event.confirm.resolve(event.newData);

    //prepare headers
    let headers = this.createHeader();

    //update Database
    this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path , event.newData ,{ headers: headers, observe: 'response' })
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
    this.tempProduct = JSON.parse(JSON.stringify(event.data));
    console.log(this.logClass + ' delete Product' + JSON.stringify(this.tempProduct));

    //update Local listProduct
    event.confirm.resolve();

    //prepare headers
    let headers = this.createHeader();

    //update Database
    //delete is just update status form True to False
    this.tempProduct.status = false;
    this.http.put<HttpResponse<ProductEntity>>(this.urlAPI.path , this.tempProduct , { headers: headers, observe: 'response' })
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
    this.tempProduct = JSON.parse(JSON.stringify(event.newData));
    console.log(this.logClass + ' add Product' + JSON.stringify(this.tempProduct));
    //convert proPrice ve lai thanh integer
    this.tempProduct.proPrice = Number(this.tempProduct.proPrice);

    //delete ID de cho Backend tu dong tao
    delete this.tempProduct.proID;

    //update Local listProduct
    //waiting for Backend return newID
    //event.confirm.resolve();

    //prepare headers
    let headers = this.createHeader();

    //update Database

    this.http.post<HttpResponse<ProductEntity>>(this.urlAPI.path , this.tempProduct , { headers: headers, observe: 'response' })
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

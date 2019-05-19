import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { cateEntity }  from './CategoryEntity';
import { UrlAPIEntity} from '../../UrlAPIEntity';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { listUrlAPI } from '../../listUrlAPI';
import {Observable, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  logClass = "Category";
  urlAPI: UrlAPIEntity;
  listCategory: cateEntity[] = [] ;
  listImage: string[] = [];
  isShow: boolean = false;
  @Output() selectedCate = new EventEmitter();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchCate();
  }

  OnSelectedCate(id : number): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.selectedCate.emit(id);
  }




  fetchCate(): void {
    this.getCate().subscribe(
      response =>{
      this.listCategory = response;
      console.log(this.logClass + JSON.stringify(this.listCategory));
      // this.listCategory.forEach(
      //       item => {
      //             console.log("cateID:" +  item.cateID)
      //             item.listImage = [];
      //             // this.getAllImage(item.cateID);
      //             this.getAllCateImage(item.cateID).subscribe(
      //               result =>{
      //                     item.listImage = result;
      //
      //               }
      //             );
      //       }
      // );

      // this.isShow = true;
      }
    );

  }
  getCate(): Observable<cateEntity[]> {
        this.urlAPI = listUrlAPI.find(url => url.name === 'categoryResource');
      return this.http.get<cateEntity[]>(this.urlAPI.path + "/list");
  }
  getAllImage(id: number): void{
    // console.log(this.logClass + " Get All Image");
    // id = +this.route.snapshot.paramMap.get('id');
    this.getAllCateImage(id).subscribe(
      result => {
                  console.log(this.logClass + ' Image Load');
                  this.listImage = result;
                  console.log("list image:" + JSON.stringify(this.listImage[0]));
                  // this.isShow = true;
                }
    );
  }
  getAllCateImage(id: number): Observable<string[]>{
    console.log(this.logClass + ' get All Image for service' + id);
    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
    return this.http.get<string[]>(this.urlAPI.path + '/Category/' + id);
  }
}

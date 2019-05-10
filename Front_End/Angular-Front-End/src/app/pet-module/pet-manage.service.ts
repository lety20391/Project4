import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { listUrlAPI } from '../listUrlAPI';
import { UrlAPIEntity } from '../UrlAPIEntity';
import {PetEntity} from './PetEntity';

@Injectable({
  providedIn: 'root'
})
export class PetManageService {

  logClass = '--Pet Manage Service: ';
  urlAPI: UrlAPIEntity;

  constructor(
    private http: HttpClient
  ) { }

  createNewPetInfo(newPet: PetEntity): Observable<PetEntity>{
    console.log(this.logClass + " init");
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');
    console.log(this.logClass + this.urlAPI.path);
    return this.http.post<PetEntity>(this.urlAPI.path + '/Post', newPet);
  }

  getPetByID(id: number): Observable<PetEntity>{
    console.log(this.logClass + 'getPetByID ' + id);
    this.urlAPI = listUrlAPI.find(url => url.name === 'petResource');

    return this.http.get<PetEntity>(this.urlAPI.path + '/getDetail/findID/' + id);
    // .subscribe(
    //   response => {
    //     console.log(this.logClass + " Status:" + response.status);
    //     return response;
    //   }
    // );
  }

  getAllPetImage(id: number): Observable<string[]>{
    console.log(this.logClass + ' get All Image for pet' + id);
    this.urlAPI = listUrlAPI.find(url => url.name === 'getAllImageResource');
    return this.http.get<string[]>(this.urlAPI.path + '/Pet/' + id);
  }


}

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
    console.log(this.logClass + this.urlAPI.path)
    return this.http.post<PetEntity>(this.urlAPI.path, newPet);
  }

  
}

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JWTHeaderService {
  jwtString = '';
  constructor() { }

  addJWT(receivedJWT: string){
    this.jwtString = receivedJWT;
    localStorage.setItem('JWT', receivedJWT);
  }

  cleanJWT(){
    this.jwtString = '';
    localStorage.setItem('JWT', '');
  }

  getJWT(): string{
    if(localStorage.getItem('JWT') != null)
      return localStorage.getItem('JWT');
    return '';
  }
  clearLocalStorage(){
    return localStorage.clear();
}
}

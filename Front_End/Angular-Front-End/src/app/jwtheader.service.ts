import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JWTHeaderService {
  jwtString = '';
  constructor() { }

  addJWT(receivedJWT: string){
    this.jwtString = receivedJWT;
  }

  cleanJWT(){
    this.jwtString = '';
  }

  getJWT(): string{
    return this.jwtString;
  }
}

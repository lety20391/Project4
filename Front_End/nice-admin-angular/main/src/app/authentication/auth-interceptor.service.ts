import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {JWTHeaderService} from '../jwtheader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  logClass = '--Auth Interceptor: ';

  constructor(
    private jwtService: JWTHeaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(this.logClass + 'init');
    // Get the auth token from the service.
    const authToken = this.jwtService.getJWT();

    if (authToken == '')
    {
      console.log(this.logClass + 'Not Found any Auth Token -> sent original request')
      return next.handle(req);
    }else{
      console.log(this.logClass + 'Modify request header');

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' +  authToken)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
  }
}

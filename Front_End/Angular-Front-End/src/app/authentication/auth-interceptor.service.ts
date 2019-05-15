import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {JWTHeaderService} from '../jwtheader.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  logClass = '--Auth Interceptor: ';

  constructor(
    private jwtService: JWTHeaderService,
    private route: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.logClass + 'init');
    // Get the auth token from the service.
    const authToken = this.jwtService.getJWT();

    if (authToken == '')
    {
      console.log(this.logClass + 'Not Found any Auth Token -> sent original request')
      //them vao doan catchError de tim loi unauthorized 401
      //neu reponse tra ve co loi 401 thi redicrect ve trang login
      return next.handle(req).pipe(
            catchError(
              error => {
                if( error instanceof HttpErrorResponse)
                  console.log('--Http Response Error(noJWT):' + JSON.stringify(error));
                  if (error.status == 401)
                    this.route.navigate(['/mainlayout/login']);
                return of(error);
              }
            )
        );
    }else{
      console.log(this.logClass + 'Modify request header');

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' +  authToken)
      });

      // send cloned request with header to the next handler.
      //them vao doan catchError de tim loi unauthorized 401
      //neu reponse tra ve co loi 401 thi redicrect ve trang login
      return next.handle(authReq)
      .pipe(
            catchError(
              error => {
                if( error instanceof HttpErrorResponse)
                  console.log('--Http Response Error(noJWT):' + JSON.stringify(error));
                  if (error.status == 401)
                    this.route.navigate(['/mainlayout/login']);
                return of(error);
              }
            )
        );
    }
  }


}

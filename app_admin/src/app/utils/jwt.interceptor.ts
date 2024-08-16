import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthAPI = request.url.startsWith('login') || request.url.startsWith('register');

    console.log(`Intercepting request to: ${request.url}`); // Log the intercepted request URL
    console.log(`Is Auth API: ${isAuthAPI}`); // Log whether the request is to the auth API

    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();
      
      console.log(`Token found: ${token}`); // Log the token

      if (token) {
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Authorization header added to request'); // Log that the Authorization header was added
        return next.handle(authReq);
      } else {
        console.log('No token found, request sent without Authorization header'); // Log if no token is found
      }
    } else {
      console.log('Request sent without Authorization header'); // Log if the request is not modified
    }

    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Oauth2AuthService } from './oauth2-auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private oauth2AuthService: Oauth2AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.oauth2AuthService.getToken().pipe(
      switchMap(token => {                              
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });                                                                                                    
        return next.handle(request);
      }),
      catchError((err, caught) => {
        return next.handle(request);
      }));
  }
}

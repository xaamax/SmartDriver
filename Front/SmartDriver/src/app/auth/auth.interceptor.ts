import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (localStorage.getItem('token') !== null) {
      const cloneHttp = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      });
      return next.handle(cloneHttp).pipe(
        tap(
          succ => {},
          err => {
            if (err.status === 401) {
              this.router.navigateByUrl('user/login');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}

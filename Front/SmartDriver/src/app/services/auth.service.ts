import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://localhost:5001/api/user';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  Login(model: any): any {
    return this.http
    .post(`${this.baseURL}/login`, model).pipe(
      map((res: any) => {
        const user = res;
        if (user){
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('id', user.id);
          sessionStorage.setItem('fullname', user.fullname);
          sessionStorage.setItem('setor', user.setor);
          sessionStorage.setItem('perfil', user.perfil);
          sessionStorage.setItem('dpto', user.dpto);
          sessionStorage.setItem('uf', user.uf);
        }
      })
    );
  }

  Register(model: any): any {
    return this.http
    .post(`${this.baseURL}/register`, model);
  }

  LoggedIn(): any {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}

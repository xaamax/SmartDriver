import { User } from '@app/models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  baseURL = 'https://localhost:5001/api/user';

  constructor(private http: HttpClient) {}

  public getUsuarios(
    dpto = sessionStorage.getItem('dpto'),
    uf = sessionStorage.getItem('uf')
  ): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/dpto/${dpto}/uf/${uf}`);
  }

  public getUser(id: number): Observable<User>{
    return this.http
      .get<User>(`${this.baseURL}/${id}`);
  }

  public post(user: User): Observable<User>{
    return this.http
      .post<User>(`${this.baseURL}/register`, user);
  }

  public put(user: User): Observable<User>{
    return this.http
      .put<User>(`${this.baseURL}/${user.id}`, user);
  }

  public delete(id: number): Observable<any>{
    return this.http
      .delete(`${this.baseURL}/${id}`);
  }
}

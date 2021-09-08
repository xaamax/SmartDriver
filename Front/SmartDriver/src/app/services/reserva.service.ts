import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '@app/models/Reserva';

@Injectable()
export class ReservaService {
baseURL = 'https://localhost:5001/api/reservas';

constructor(private http: HttpClient) {}

public getReservas(
    dpto = sessionStorage.getItem('dpto'),
    uf = sessionStorage.getItem('uf')
): Observable<Reserva[]>{
  return this.http
    .get<Reserva[]>(`${this.baseURL}/dpto/${dpto}/uf/${uf}`);
}

public post(reserva: Reserva): Observable<Reserva>{
  return this.http
    .post<Reserva>(`${this.baseURL}`, reserva);
}

public put(reserva: Reserva): Observable<Reserva>{
  return this.http
    .put<Reserva>(`${this.baseURL}/${reserva.num}`, reserva);
}

public delete(num: number): Observable<any>{
  return this.http
    .delete(`${this.baseURL}/${num}`);
}

}

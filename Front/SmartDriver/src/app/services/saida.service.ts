import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saida } from '../models/Saida';

@Injectable()
export class SaidaService {
baseURL = 'https://localhost:5001/api/saidas';

constructor(private http: HttpClient) {}

public getSaidas(
    dpto = sessionStorage.getItem('dpto'),
    uf = sessionStorage.getItem('uf')
): Observable<Saida[]>{
  return this.http
    .get<Saida[]>(`${this.baseURL}/dpto/${dpto}/uf/${uf}`);
}

public detalheSaida(id: number): Observable<Saida>{
  return this.http
    .get<Saida>(`${this.baseURL}/${id}`);
}

public postupload(file: File) {
  const fileToUpload = <File>file[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);

  return this.http
    .post(`${this.baseURL}/upload`, formData);
}

public post(saida: Saida): Observable<Saida>{
  return this.http
    .post<Saida>(`${this.baseURL}`, saida);
}

public put(saida: Saida): Observable<Saida>{
  return this.http
    .put<Saida>(`${this.baseURL}/${saida.id}`, saida);
}

public delete(id: number): Observable<any>{
  return this.http
    .delete(`${this.baseURL}/${id}`);
}
}

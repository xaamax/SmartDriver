import { Veiculo } from '@app/models/Veiculo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class VeiculoService {
  baseURL = 'https://localhost:5001/api/veiculos';

  constructor(private http: HttpClient) {}

  public getVeiculos(
    dpto = sessionStorage.getItem('dpto'),
    uf = sessionStorage.getItem('uf')
  ): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.baseURL}/dpto/${dpto}/uf/${uf}`);
  }

  public getVeiculoByPlaca(placa: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.baseURL}/${placa}`);
  }

  public getVeiculosByModelo(modelo: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.baseURL}/modelo`);
  }

  public post(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.baseURL}`, veiculo);
  }

  public put(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.baseURL}/${veiculo.placa}`, veiculo);
  }

  public delete(placa: string): Observable<any>{
    return this.http
      .delete(`${this.baseURL}/${placa}`);
  }
}

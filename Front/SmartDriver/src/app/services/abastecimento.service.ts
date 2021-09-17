import { Abastecimento } from '@app/models/Abastecimento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AbastecimentoService {
  baseURL = 'https://localhost:5001/api/abastecimentos';

  constructor(private http: HttpClient) {}

  public getAbastecimentos(placa: string): Observable<Abastecimento[]> {
    return this.http.get<Abastecimento[]>(`${this.baseURL}/${placa}/placa`);
  }

  public getVeiculosById(id: number): Observable<Abastecimento> {
    return this.http.get<Abastecimento>(`${this.baseURL}/${id}`);
  }

  public post(abastecimento: Abastecimento): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(`${this.baseURL}`, abastecimento);
  }

  public put(abastecimento: Abastecimento): Observable<Abastecimento> {
    return this.http.put<Abastecimento>(`${this.baseURL}/${abastecimento.id}`, abastecimento);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}

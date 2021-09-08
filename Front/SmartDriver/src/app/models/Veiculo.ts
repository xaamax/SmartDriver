import { Saida } from './Saida';

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  km: number;
  manutencaokm: number;
  rodizio: string;
  dpto: string;
  uf: string;
  situacao: string;
  saidas: Saida[];
  obs: string;
}

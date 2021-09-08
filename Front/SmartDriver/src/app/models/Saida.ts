import { User } from './User';
import { Veiculo } from './Veiculo';
export interface Saida {
  id: number;
  datasaida: Date;
  kmsaida: number;
  combustsaida: string;
  destino: string;
  obssaida: string;
  dataretorno: Date;
  kmretorno: number;
  combustretorno: string;
  localestacionado: string;
  desclocalestacionado: string;
  obsretorno: string;
  placaid: string;
  condutorid: number;
  dadosveiculo: Veiculo[];
  dadoscondutor: User[];
}

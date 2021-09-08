import { User } from './User';
import { Veiculo } from './Veiculo';
export interface Reserva {
  num: number;
  datasaida: Date;
  dataretorno: Date;
  destino: string;
  motivo: string;
  qtdpessoas: number;
  obs: string;
  fluig: string;
  situacao: string;
  placaid: string;
  condutorid: number;
  dadosveiculo: Veiculo[];
  dadoscondutor: User[];
}

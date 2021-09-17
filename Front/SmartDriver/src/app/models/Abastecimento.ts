import { User } from '@app/models/User';
export interface Abastecimento {
  id: number
  dataAbastecimento: Date
  kmAbastecimento: number
  valor: number
  condutorid: number
  placaid: string
  dadoscondutor: User[]
}

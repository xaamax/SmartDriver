import { FormControl } from "@angular/forms";

export class UfSetorDptos {
  static Estados(): any {
    return [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'DF',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ];
  }

  static Dptos(uf: string): any {
    if (uf) {
      switch (uf) {
        case 'MG':
          return ['', 'Engenharia', 'Manutenção'];
        case 'RJ':
          return [
            '',
            'ADM (Engenharia)',
            'Manutenção (Campos dos Goytacazes)',
            'Manutenção Predial',
          ];
        case 'SP':
          return [
            '',
            'Base Bauru',
            'Base Campinas',
            'Base Presidente Prudente',
            'Base Santos',
            'Base SP',
            'Base São José dos Campos',
            'Base São José do Rio Preto',
            'Prédio ADM (João Boemer)',
            'TV (Brás)',
          ];
        default:
          return ['', 'Engenharia | Manutenção'];
      }
    }
  }

  static Setores(): any {
    return [
      'Administrativo',
      'Aprov',
      'AVCB',
      'Contratação',
      'Elétrica',
      'Hidráulica',
      'Instalações',
      'Marcenaria',
      'Montagem',
      'Obras',
      'Orçamentos',
      'Planejamento',
      'Projetos',
      'Pastor/Bispo',
      'Pintura',
      'Portaria',
      'Refrigeração',
      'SGEA',
      'Serralheria',
      'Sonorização',
      'Telhado',
      'Transporte',
      'Vidro'
    ];
  }
}

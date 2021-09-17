/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AbastecimentoService } from './abastecimento.service';

describe('Service: Abastecimento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbastecimentoService]
    });
  });

  it('should ...', inject([AbastecimentoService], (service: AbastecimentoService) => {
    expect(service).toBeTruthy();
  }));
});

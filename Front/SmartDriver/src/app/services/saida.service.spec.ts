/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaidaService } from './saida.service';

describe('Service: Saida', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaidaService]
    });
  });

  it('should ...', inject([SaidaService], (service: SaidaService) => {
    expect(service).toBeTruthy();
  }));
});

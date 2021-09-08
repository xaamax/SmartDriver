import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaDetalheComponent } from './saida-detalhe.component';

describe('SaidaDetalheComponent', () => {
  let component: SaidaDetalheComponent;
  let fixture: ComponentFixture<SaidaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaidaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

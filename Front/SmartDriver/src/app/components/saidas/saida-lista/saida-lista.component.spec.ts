import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaListaComponent } from './saida-lista.component';

describe('SaidaListaComponent', () => {
  let component: SaidaListaComponent;
  let fixture: ComponentFixture<SaidaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaidaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

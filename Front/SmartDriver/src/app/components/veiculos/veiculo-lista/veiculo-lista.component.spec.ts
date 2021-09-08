import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoListaComponent } from './veiculo-lista.component';

describe('VeiculoListaComponent', () => {
  let component: VeiculoListaComponent;
  let fixture: ComponentFixture<VeiculoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

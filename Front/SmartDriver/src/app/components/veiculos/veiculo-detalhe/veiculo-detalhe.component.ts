import { Abastecimento } from './../../../models/Abastecimento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '@app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AbastecimentoService } from '@app/services/abastecimento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css']
})
export class VeiculoDetalheComponent implements OnInit {
  form: FormGroup;
  veiculo = {} as Veiculo;
  abastecimento = {} as Abastecimento;
  public abastecimentos: Abastecimento[] = [];
  stateForm = 'post';
  diarodizio = '';
  public hoje = moment().locale('pt-br').format(`dddd`);


  get f(): any{
    return this.form.controls;
  }

  public rodizio(placa: string): any {
    if (placa  && sessionStorage.getItem('uf') === 'SP'){
        switch (placa.substring(6)) {
          case '1':
          case '2':
            return this.diarodizio = 'Segunda-feira';
          case '3':
          case '4':
            return this.diarodizio = 'Terça-feira';
          case '5':
          case '6':
            return this.diarodizio = 'Quarta-feira';
          case '7':
          case '8':
            return this.diarodizio = 'Quinta-feira';
          case '9':
          case '0':
            return this.diarodizio = 'Sexta-feira';
          default:
            return this.diarodizio = null;
        }
    }
  }

  constructor(
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private veiculoService: VeiculoService,
    private abastecimentoService: AbastecimentoService,
    private toastr: ToastrService,
    public routerActive: ActivatedRoute,
    public router: Router
    ) { this.localeService.use('pt-br'); }

  ngOnInit(): void {
    this.validation();
    this.detalheVeiculo();
    this.getAbastecimentos();
  }

  public validatorInput(f): any {
    return ValidatorField.cssValidator(f);
  }

  get bsDateConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      containerClass: 'theme-blue',
      showWeekNumbers: false
    };
  }

  public formatData(data: Date): any {
    return this.stateForm === 'put' ? new Date(data) : null;
  }

  public cssVeiculo(disponivel: string): any {
    switch (disponivel) {
      case 'Indisponível':
      case 'Em Manutenção':
      return disponivel = ' h6 fw-bold ml-2 text-danger';
      case 'Em Uso':
      return disponivel = 'h6 fw-bold ml-2 text-muted';
      default:
        return disponivel = 'h6 fw-bold ml-2 text-success';
    }
  }

  public icone(disponivel: string): any {
    switch (disponivel) {
      case 'Disponível':
      return disponivel = 'fa fa-check me-1';
      case 'Em Uso':
      return disponivel = 'fa fa-sync-alt me-1';
      case 'Em Manutenção':
        return disponivel = 'fa fa-wrench me-1';
      default:
        return disponivel = 'fa fa-times me-1';
    }
  }

  public detalheVeiculo(): void {
    const veiculoPlaca = this.routerActive.snapshot.paramMap.get('veiculo');
    if (veiculoPlaca !== null) {
      this.spinner.show();
      this.stateForm = 'put';
      this.veiculoService.getVeiculoByPlaca(veiculoPlaca).subscribe(
        (veiculo: Veiculo) => {
          this.veiculo = { ...veiculo };
          this.form.patchValue(this.veiculo);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Falha ao tentar carregar Véiculo.', 'Erro');
          console.error(error);
        },
        () => this.spinner.hide()
      );
  }
}

public getAbastecimentos(): void {
  const veiculoPlaca = this.routerActive.snapshot.paramMap.get('veiculo');
  this.abastecimentoService.getAbastecimentos(veiculoPlaca).subscribe({
    next: (abastecimentos: Abastecimento[]) => {
      this.abastecimentos = abastecimentos;
    },
    error: (error: any) => {
      this.spinner.hide();
      this.toastr.error('Erro ao carregar os Abastecimentos.', 'Erro');
    },
    complete: () => this.spinner.hide(),
  });
}

editarAbastecimento(abastecimento: Abastecimento, template: any): void {
  this.openModal(template);
  this.abastecimento = {...abastecimento};
  this.form.patchValue(this.abastecimento);
}

novoAbastecimento(template: any): void {
  this.openModal(template);
}

openModal(template: any): void {
  template.show();
}

  private validation(): void {
    this.form = this.fb.group({
      placa : [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      modelo : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      km : [null, Validators.required],
      manutencaokm : null,
      rodizio : null,
      dpto : [sessionStorage.getItem('dpto'), Validators.required],
      uf : [sessionStorage.getItem('uf'), Validators.required],
      situacao : [null, Validators.required],
      obs : null,
      dataAbastecimento : [null, Validators.required],
    });
  }

  public salvar(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.veiculo =
        this.stateForm === 'post'
          ? { ...this.form.value }
          : { placa: this.veiculo.placa, ...this.form.value };

      this.veiculoService[this.stateForm](this.veiculo)
        .subscribe(
          () =>
            this.toastr.success(
              'Véiculo salvo!',
              'Sucesso'
            ),
          (error: any) => {
            this.toastr.error('Falha ao salvar veículo.', 'Erro');
            console.log(error);
          },
          () => this.spinner.hide()
        )
        .add(() => this.spinner.hide());
    }
  }

  public resetForm(): void {
    this.form.reset();
  }

}

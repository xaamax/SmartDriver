import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '@app/models/Veiculo';
import { Saida } from '@app/models/Saida';
import { SaidaService } from '@app/services/saida.service';
import { VeiculoService } from '@app/services/veiculo.service';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-saida-detalhe',
  templateUrl: './saida-detalhe.component.html',
  styleUrls: ['./saida-detalhe.component.css'],
})
export class SaidaDetalheComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  saidaId = this.routerActive.snapshot.paramMap.get('saida');
  saida = {} as Saida;
  veiculo = {} as Veiculo;
  stateForm = 'post';
  form: FormGroup;
  image: File;
  condutor = sessionStorage.getItem('fullname');
  setor = sessionStorage.getItem('setor');
  dpto = sessionStorage.getItem('dpto');
  uf = sessionStorage.getItem('uf');

  get f(): any {
    return this.form.controls;
  }

  public validatorInput(f): any {
    return ValidatorField.cssValidator(f);
  }

  constructor(
    private localeService: BsLocaleService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private saidaService: SaidaService,
    private veiculoService: VeiculoService,
    private toastr: ToastrService,
    public router: Router,
    public navigation: Location,
    public routerActive: ActivatedRoute,
    public location: Location
  ) {
    this.localeService.use('pt-br');
  }

  get placa(): any {
    return this.routerActive.snapshot.paramMap.get('veiculo');
  }

  get bsDateConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      containerClass: 'theme-blue',
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      showWeekNumbers: false,
      showTodayButton: true,
      todayPosition: 'center',
      todayButtonLabel: 'Hoje',
      maxDate: new Date(),
    };
  }

  get locaisEstacionados(): any {
    switch (sessionStorage.getItem('dpto')) {
      case 'Prédio ADM (João Boemer)':
        return [
          'Subsolo (Prédio ADM)',
          'Subsolo (EGTS)',
          '1º Andar (EGTS)',
          '2º Andar (EGTS)',
        ];
      case 'Base SP':
        return [
          'Catedral Brás',
          'Catedral Guarulhos',
          'Catedral João Dias',
          'Catedral Itaquera',
          'Catedral Santo André',
        ];
      default:
        return [
          'Estacionamento (Prédio ADM)',
          'Estacionamento (Igreja)',
          'Pátio',
        ];
    }
  }

  ngOnInit(): void {
    this.validation();
    this.detalheSaida();
    this.detalheVeiculo();
  }

  private validation(): void {
    this.form = this.fb.group({
      datasaida: ['', [Validators.required]],
      kmsaida: ['', [Validators.required]],
      combustsaida: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      obssaida: null,
      dataretorno: null,
      kmretorno: null,
      combustretorno: null,
      localestacionado: null,
      desclocalestacionado: null,
      obsretorno: null,
      condutorid: +sessionStorage.getItem('id'),
      placaid: this.placa,
    });
  }

  public detalheVeiculo(): void {
    this.spinner.show();
    this.veiculoService.getVeiculoByPlaca(this.placa).subscribe(
      (veiculo: Veiculo) => {
        this.veiculo = { ...veiculo };
        this.form.patchValue(this.veiculo);
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Falha ao tentar carregar Veículo.', 'Erro');
        console.error(error);
      },
      () => this.spinner.hide()
    );
  }

  public detalheSaida(): void {
    if (this.saidaId !== null) {
      this.spinner.show();
      this.stateForm = 'put';
      this.saidaService.detalheSaida(+this.saidaId).subscribe(
        (saida: Saida) => {
          this.saida = { ...saida };
          this.condutor = saida.dadoscondutor[0].fullName;
          this.setor = saida.dadoscondutor[0].setor;
          this.form.patchValue(this.saida);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Falha ao tentar carregar Saída.', 'Erro');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvar(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.form.value.datasaida = moment(this.form.value.datasaida).format(
        `YYYY-MM-DDTHH:mm:ss`
      );
      this.form.value.dataretorno = this.form.value.dataretorno
        ? moment(this.form.value.dataretorno).format(`YYYY-MM-DDTHH:mm:ss`)
        : null;
      this.saida =
        this.stateForm === 'post'
          ? { ...this.form.value }
          : { id: this.saida.id, ...this.form.value };

      this.saidaService[this.stateForm](this.saida)
        .subscribe(
          () => this.toastr.success('Saída de véiculo salva!', 'Sucesso'),
          (error: any) => {
            this.toastr.error('Falha ao salvar Saída de veículo.', 'Erro');
            console.log(error);
          },
          () => this.spinner.hide()
        )
        .add(() => this.spinner.hide(), this.router.navigate(['/saidas']).finally);
    }
  }

  /*onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.image = event.target.files;
      console.log(this.image);
    }
  }*/

  public resetForm(): void {
    this.form.reset();
  }
}

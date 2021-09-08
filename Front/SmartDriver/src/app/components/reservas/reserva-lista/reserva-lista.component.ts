import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from '@app/models/Reserva';
import { Veiculo } from '@app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo.service';
import { ReservaService } from '@app/services/reserva.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-reserva-lista',
  templateUrl: './reserva-lista.component.html',
  styleUrls: ['./reserva-lista.component.css'],
})
export class ReservaListaComponent implements OnInit {
  form: FormGroup;
  stateForm = 'post';
  public hoje = moment().locale('pt-br').format(`dddd`);
  diarodizio = '';
  public veiculos: Veiculo[] = [];
  reserva = {} as Reserva;
  veiculo = {} as Veiculo;
  public reservas: Reserva[] = [];
  public reservasFiltradas: Reserva[] = [];
  private filtroListado = '';
  modalRef: BsModalRef;

  public numreserva: number;
  public saidareserva: Date;
  public retornoreserva: Date;
  public reservadestino: string;
  public reservacondutor: string;

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroDataSaida(value: string) {
    this.filtroListado = value;
    this.reservasFiltradas = this.filtroLista
      ? this.filtrarReservas(this.filtroLista)
      : this.reservas;
  }

  public filtrarReservas(filtrarPor: string): Reserva[] {
    return this.reservas.filter(
      (reserva) =>
      reserva.datasaida.toString().indexOf(moment(filtrarPor).format('YYYY-MM-DD')) !== -1
    );
  }

  constructor(
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private reservaService: ReservaService,
    private veiculoService: VeiculoService,
    private toastr: ToastrService,
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.form = this.fb.group({ date: null });
    this.spinner.show();
    this.validation();
    this.getReservas();
    this.getVeiculos();
  }

  reservar(): any {
    if (this.reserva.situacao === 'Confirmada'){
      this.reserva.situacao = 'À confirmar';
      this.form.value.placaid = null;
    } else {
      this.reserva.situacao = 'Confirmada';
      this.form.value.placaid = '';
    }
  }

  get f(): any {
    return this.form.controls;
  }

  public validatorInput(f): any {
    return ValidatorField.cssValidator(f);
  }

  get bsDateConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      containerClass: 'theme-blue',
      showWeekNumbers: false,
      minDate: new Date()
    };
  }

  public formatData(data: Date): any {
    return this.stateForm === 'put' ? new Date(data) : null;
  }

  public getVeiculos(): void {
    this.veiculoService.getVeiculos().subscribe({
      next: (veiculos: Veiculo[]) => {
        this.veiculos = veiculos;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  public detalheVeiculo(placa: string): void {
    this.veiculoService.getVeiculoByPlaca(placa).subscribe(
      (veiculo: Veiculo) => {
        this.veiculo = { ...veiculo };
      },
      (error: any) => {
        console.error(error);
      }
    );
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

  editarReserva(reserva: Reserva, template: any): void {
    this.stateForm = 'put';
    this.saidareserva = reserva.datasaida;
    this.openModal(template);
    this.reserva = {...reserva};
    this.form.patchValue(this.reserva);
    this.reserva.situacao === 'Confirmada' ? this.detalheVeiculo(this.reserva.placaid) : null;
  }

  novaReserva(template: any): void {
    this.stateForm = 'post';
    this.reserva.situacao = 'À confirmar';
    this.openModal(template);
  }

  openModal(template: any): void {
    this.form.reset();
    template.show();
  }

  public deleteReserva(
    event: any,
    template: TemplateRef<any>,
    numreserva: number,
    saidareserva: Date,
    retornoreserva: Date,
    reservadestino: string,
    reservacondutor: string
  ): void {
    event.stopPropagation();
    this.numreserva = numreserva;
    this.saidareserva = saidareserva;
    this.retornoreserva = retornoreserva;
    this.reservadestino = reservadestino;
    this.reservacondutor = reservacondutor;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.reservaService.delete(this.numreserva).subscribe(
      (res: any) => {
        if (res.msg === 'Deletado'){
          this.toastr.success('Reserva excluída.', 'Sucesso');
          this.spinner.hide();
          this.getReservas();
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(`Falha ao tentar excluir Reserva: ${this.numreserva}`, 'Erro');
        this.spinner.hide();
      },
      () => {},
    );
  }
  decline(): void {
    this.modalRef.hide();
  }

  public getReservas(): void {
    this.reservaService.getReservas().subscribe({
      next: (reservas: Reserva[]) => {
        this.reservas = reservas;
        this.reservasFiltradas = this.reservas;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as Reservas.', 'Erro');
      },
      complete: () => this.spinner.hide(),
    });
  }

  public salvar(template: any): void {
    this.spinner.show();
    if (this.form.valid) {
      this.stateForm === 'post'
      ? this.form.value.situacao = 'À confirmar'
      : this.form.value.situacao = this.reserva.situacao;

      this.stateForm === 'post'
      ? this.form.value.condutorid = +sessionStorage.getItem('id')
      : this.form.value.condutorid = this.reserva.condutorid;

      this.reserva =
        this.stateForm === 'post'
          ? { ...this.form.value }
          : { num: this.reserva.num, ...this.form.value };

      this.reservaService[this.stateForm](this.reserva)
        .subscribe(
          () => { this.toastr.success('Dados salvos com Sucesso!', `Nº Reserva: ${this.reserva.num}`), this.getReservas(); },
          (error: any) => {
            this.toastr.error('Falha ao salvar Dados.', `Nº Reserva: ${this.reserva.num}`);
            console.log(error);
          },
          () => this.spinner.hide()
        )
        .add(() => this.spinner.hide(), template.hide());
    }
  }

  private validation(): void {
    this.form = this.fb.group({
      datasaida: ['', Validators.required],
      dataretorno: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      qtdpessoas: ['', [Validators.required]],
      fluig: null,
      obs: null,
      placaid: null
    });
  }
}

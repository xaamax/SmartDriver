import { Component, OnInit, TemplateRef } from '@angular/core';
import { Saida } from '@app/models/Saida';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SaidaService } from '@app/services/saida.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-saida-lista',
  templateUrl: './saida-lista.component.html',
  styleUrls: ['./saida-lista.component.css'],
})
export class SaidaListaComponent implements OnInit {
  hoje = new Date();
  public saidas: Saida[] = [];
  public saidasFiltradas: Saida[] = [];
  private filtroListado = '';
  modalRef: BsModalRef;
  public datasaida: string;
  public destino: string;
  public numsaida: number;
  public veiculo: string;

  constructor(
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private saidaService: SaidaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getSaidas();
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroDataSaida(value: string) {
    this.filtroListado = value;
    this.saidasFiltradas = this.filtroLista
      ? this.filtrarSaidas(this.filtroLista)
      : this.saidas;
  }

  public filtrarSaidas(filtrarPor: string): Saida[] {
    return this.saidas.filter(
      (reserva) =>
      reserva.datasaida.toString().indexOf(moment(filtrarPor).format('YYYY-MM-DD')) !== -1
    );
  }

  public getSaidas(): void {
    this.saidaService.getSaidas().subscribe({
      next: (saidas: Saida[]) => {
        this.saidas = saidas;
        this.saidasFiltradas = this.saidas;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as Saídas.', 'Erro');
      },
      complete: () => this.spinner.hide(),
    });
  }

  detalheSaida(id: number, placa: string): void {
    this.router.navigate([`saidas/veiculo/${placa}/saida/${id}`]);
  }

  public openModal(
    event: any,
    template: TemplateRef<any>,
    numsaida: number,
    veiculo: string
  ): void {
    event.stopPropagation();
    this.numsaida = numsaida;
    this.veiculo = veiculo;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.saidaService.delete(this.numsaida).subscribe(
      (res: any) => {
        if (res.msg === 'Deletado') {
          this.toastr.success('Saída de véiculo excluída.', 'Sucesso');
          this.spinner.hide();
          this.getSaidas();
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(
          `Falha ao tentar excluir Saída de veículo: ${this.numsaida}`,
          'Erro'
        );
        this.spinner.hide();
      },
      () => {}
    );
  }

  decline(): void {
    this.modalRef.hide();
  }
}

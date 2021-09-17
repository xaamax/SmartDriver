import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from '@app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo.service';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.css'],
})
export class VeiculoListaComponent implements OnInit {
  veiculo = {} as Veiculo;
  public veiculos: Veiculo[] = [];
  public veiculosFiltrados: Veiculo[] = [];
  public placa: string;
  modalRef: BsModalRef;

  public imgLargura = 180;
  public imgMargem = 2;
  public exibirImg = false;
  private filtroListado = '';
  public hoje = moment().locale('pt-br').format(`dddd`);

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroVeiculos(value: string) {
    this.filtroListado = value;
    this.veiculosFiltrados = this.filtroLista
      ? this.filtrarVeiculos(this.filtroLista)
      : this.veiculos;
  }

  constructor(
    private modalService: BsModalService,
    private veiculoService: VeiculoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getVeiculos();
  }

  public cssVeiculo(disponivel: string): any {
    switch (disponivel) {
      case 'Indisponível':
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
      default:
        return disponivel = 'fa fa-times me-1';
    }
  }

  public filtrarVeiculos(filtrarPor: string): Veiculo[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.veiculos.filter(
      (veiculo) =>
        veiculo.placa.toLowerCase().indexOf(filtrarPor) !== -1 ||
        veiculo.modelo.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public detalheVeiculo(placa: string): any {
    return this.router.navigate([`/veiculos/veiculo/${placa}`]);
  }

  public alternarImg(): void {
    this.exibirImg = !this.exibirImg;
  }

  public getVeiculos(): void {
    this.veiculoService.getVeiculos().subscribe({
      next: (veiculos: Veiculo[]) => {
        this.veiculos = veiculos;
        this.veiculosFiltrados = this.veiculos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Veículos.', 'Erro');
      },
      complete: () => this.spinner.hide(),
    });
  }

  public openModal(
    event: any,
    template: TemplateRef<any>,
    placa: string
  ): void {
    event.stopPropagation();
    this.placa = placa;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.veiculoService.delete(this.placa).subscribe(
      (res: any) => {
        if (res.msg === 'Deletado'){
          this.toastr.success('Veículo excluído.', 'Sucesso');
          this.spinner.hide();
          this.getVeiculos();
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(`Falha ao tentar excluir Veículo: ${this.placa}`, 'Erro');
        this.spinner.hide();
      },
      () => {},
    );
  }
  decline(): void {
    this.modalRef.hide();
  }

}

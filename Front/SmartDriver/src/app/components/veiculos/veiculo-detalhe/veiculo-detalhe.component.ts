import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '@app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css']
})
export class VeiculoDetalheComponent implements OnInit {
  form: FormGroup;
  veiculo = {} as Veiculo;
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
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private veiculoService: VeiculoService,
    private toastr: ToastrService,
    public routerActive: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.validation();
    this.detalheVeiculo();
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

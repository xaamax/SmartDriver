import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/User';
import { ToastrService } from 'ngx-toastr';
import { UfSetorDptos } from '@app/helpers/UfSetorDptos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user = {} as User;
  stateForm = 'post';
  userId = this.routerActive.snapshot.paramMap.get('profile');
  exibirPass = false;
  exibirConfirmPass = false;
  get f(): any {
    return this.profileForm.controls;
  }

  constructor(
    public fb: FormBuilder,
    public location: Location,
    private userService: UserService,
    public router: Router,
    public routerActive: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.detalheUser();
  }

  get Estados(): any {
    return UfSetorDptos.Estados();
  }

  public Dptos(uf: string): any {
    return UfSetorDptos.Dptos(uf);
  }

  get Setores(): any {
    return UfSetorDptos.Setores();
  }

  public detalheUser(): void {
    if (this.userId !== null) {
      this.spinner.show();
      this.stateForm = 'put';
      this.userService.getUser(+this.userId).subscribe(
        (user: User) => {
          this.user = { ...user };
          this.profileForm.patchValue(this.user);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Falha ao tentar carregar Usuário.', 'Erro');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvar(): void {
    this.spinner.show();
    if (this.profileForm.valid) {
      this.user =
        this.stateForm === 'post'
          ? { ...this.profileForm.value }
          : { id: this.user.id, ...this.profileForm.value };

      this.userService[this.stateForm](this.user)
        .subscribe(
          () => {
            this.toastr.success('Usuário salvo!', 'Sucesso');
          },
          (error) => {
            const erro = error.error;
            erro.forEach((element: { code: any }) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Cadastro Duplicado.', 'Erro');
                  break;
                default:
                  this.toastr.error(`Erro no Cadatro! CODE: ${element.code}`);
                  break;
              }
            });
          },
          () => this.spinner.hide()
        )
        .add(() => this.spinner.hide());
    }
  }

  public validatorInput(f): any {
    return ValidatorField.cssValidator(f);
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };

    this.profileForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        perfil: 'user',
        dpto: ['', [Validators.required]],
        setor: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        userName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      formOptions
    );
  }

  public viewPass(): void {
    this.exibirPass = !this.exibirPass;
  }
  public viewConfirmPass(): void {
    this.exibirConfirmPass = !this.exibirConfirmPass;
  }
}

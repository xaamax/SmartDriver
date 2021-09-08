import { UfSetorDptos } from './../../../helpers/UfSetorDptos';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  exibirPass = false;
  exibirConfirmPass = false;
  user = {} as User;

  get f(): any {
    return this.registerForm.controls;
  }

  public validatorInput(f): any {
    return ValidatorField.cssValidator(f);
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validation();
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

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };

    this.registerForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
          ],
        ],
        perfil: ['user', [Validators.required]],
        dpto: ['', [Validators.required]],
        setor: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        userName: ['', [Validators.required, Validators.minLength(6)]],
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

  registration(): void {
    if (this.registerForm.valid) {
      this.user = Object.assign(this.registerForm.value);
      this.authService.Register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro realizado!', 'Sucesso');
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
        }
      );
    }
  }
}

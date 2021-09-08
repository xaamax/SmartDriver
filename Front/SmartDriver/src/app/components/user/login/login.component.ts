import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }


  ngOnInit(): void {}

  Login(){
    this.authService.Login(this.model)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
          this.toastr.success(`${sessionStorage.getItem('fullname')}`, 'Bem vindo ao Smart Driver');
        },
        error => {
          this.toastr.error('Falha ao Logar.', 'Erro');
        }
      );

  }

}

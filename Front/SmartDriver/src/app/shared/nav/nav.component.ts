import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  nav = false;
  Dpto = sessionStorage.getItem('dpto');
  Uf = sessionStorage.getItem('uf');
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  get showMenu(): boolean {
    switch (this.router.url) {
      case '/user/login':
        return this.nav;
      case '/user/registration':
        return this.nav;
      default:
        return !this.nav;
    }
  }

  Profile(): any {
    this.router.navigate([`/user/profile/${sessionStorage.getItem('id')}`]);
  }

  Logout(): any {
    localStorage.clear();
    sessionStorage.clear();
    this.toastr.show('Deslogado com Sucesso.');
    this.router.navigate(['/login']);
  }
}

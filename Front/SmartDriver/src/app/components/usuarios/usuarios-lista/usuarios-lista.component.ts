import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '@app/models/User';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {
  user = {} as User;
  public users: User[] = [];
  public usersFiltrados: User[] = [];
  public nome: string;
  private filtroListado = '';
  modalRef: BsModalRef;
  public userid: number;
  public usernome: string;
  public usersetor: string;

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroUsers(value: string) {
    this.filtroListado = value;
    this.usersFiltrados = this.filtroLista
      ? this.filtrarUsers(this.filtroLista)
      : this.users;
  }

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getUsuarios();
  }

  public filtrarUsers(filtrarPor: string): User[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.users.filter(
      (user) =>
        user.fullName.toLowerCase().indexOf(filtrarPor) !== -1 ||
        user.userName.toLowerCase().indexOf(filtrarPor) !== -1 ||
        user.setor.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  detalheUser(id: number): void{
    this.router.navigate([`user/profile/${id}`]);
  }

  public getUsuarios(): void {
    this.userService.getUsuarios().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.usersFiltrados = this.users;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Usuários.', 'Erro');
      },
      complete: () => this.spinner.hide(),
    });
  }

  public openModal(
    event: any,
    template: TemplateRef<any>,
    id: number,
    nome: string,
    setor: string
  ): void {
    event.stopPropagation();
    this.userid = id;
    this.usernome = nome;
    this.usersetor = setor;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.userService.delete(this.userid).subscribe(
      (res: any) => {
        if (res.msg === 'Deletado'){
          this.toastr.success('Usuário excluído.', 'Sucesso');
          this.spinner.hide();
          this.getUsuarios();
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(`Falha ao tentar excluir Usuário: ${this.userid}`, 'Erro');
        this.spinner.hide();
      },
      () => {},
    );
  }
  decline(): void {
    this.modalRef.hide();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
  @Input() template: string;
  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() icon = 'fa fa-home';
  @Input() btnListar = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subtitulo = `${sessionStorage.getItem('dpto')} | ${sessionStorage.getItem('uf')}`;
  }

  listar(): void{
    this.router.navigate([`/${this.template.toLowerCase()}/lista`]);
  }
}

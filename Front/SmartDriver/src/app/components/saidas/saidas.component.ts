import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.css']
})
export class SaidasComponent implements OnInit {

  constructor(public router: Router) { }
  visible = true;
  ngOnInit(): void {
  }
}

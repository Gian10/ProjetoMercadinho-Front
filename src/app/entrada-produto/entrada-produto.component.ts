import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada-produto',
  templateUrl: './entrada-produto.component.html',
  styleUrls: ['./entrada-produto.component.css']
})
export class EntradaProdutoComponent implements OnInit {

  public dataHoje : number = Date.now()

  constructor() { }

  ngOnInit(): void {
  }

}

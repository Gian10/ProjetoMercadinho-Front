import { Component, OnInit } from '@angular/core';
import {EntradaService} from '../services/entrada-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EntradaService]
})
export class HomeComponent implements OnInit {

  public entradaValor : number = 10
  public saidaValor : number = 10


  constructor(private entradaService : EntradaService) { }

  ngOnInit(): void {

  }

}

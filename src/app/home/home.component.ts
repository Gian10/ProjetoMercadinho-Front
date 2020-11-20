import { Component, OnInit } from '@angular/core';
import {EntradaService} from '../services/entrada-service'
import {SaidaService} from '../services/saida-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EntradaService, SaidaService]
})
export class HomeComponent implements OnInit {

  public entradaValor : number
  public saidaValor : number


  constructor(private entradaService : EntradaService, private saidaService : SaidaService) { }

  ngOnInit(): void {
    this.saidaService.getTotalSaida()
    .then((saidaTotal : number)=>{
     this.saidaValor = saidaTotal
    })
    
    
  }
}

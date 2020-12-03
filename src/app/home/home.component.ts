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

  public entradaValor : number = 0
  public saidaValor : number = 0
  public alert : boolean = true


  constructor(private entradaService : EntradaService, private saidaService : SaidaService) { }

  ngOnInit(): void {
    this.getTotal()
    
  }

  async getTotal(){
    try{
      await this.saidaService.getTotalSaida()
      .then((saidaTotal : number)=>{
        if(saidaTotal !== null)
          this.saidaValor = saidaTotal
    })  
      await this.entradaService.getTotalEntrada()
      .then((entradaTotal: number)=>{
        if(entradaTotal !== null)
          this.entradaValor = entradaTotal
    })
    }catch(erro){
      this.alert = false
    }
  }
}

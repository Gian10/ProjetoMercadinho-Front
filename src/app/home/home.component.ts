import { Component, OnInit } from '@angular/core';
import {EntradaService} from '../services/entrada-service'
import {EntradaSaidaTotal} from '../model/entrada-saida-total'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EntradaService]
})
export class HomeComponent implements OnInit {

  public entradaValor : number
  public saidaValor : number = 10

  public entradaTotal : EntradaSaidaTotal

  constructor(private entradaService : EntradaService) { }

  ngOnInit(): void {

    this.entradaService.GetEntradaTotal()
    .then((entradaListar : Array<EntradaSaidaTotal>)=>{

      if(entradaListar.length === 0){
          this.entradaValor = 0
      }else{
        this.entradaValor = entradaListar[0].entradaValor
      }
    })
    .catch((e : any)=>{
      console.log("Erro na chamada do método GetEntradaTotal()")
    })
  }

}

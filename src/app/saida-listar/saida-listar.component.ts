import { Component, OnInit } from '@angular/core';
import {SaidaProduto} from '../model/saida-produto'
import {SaidaService} from '../services/saida-service'

@Component({
  selector: 'app-saida-listar',
  templateUrl: './saida-listar.component.html',
  styleUrls: ['./saida-listar.component.css'],
  providers:[SaidaService]
})


export class SaidaListarComponent implements OnInit {

  public saidaLista : Array<SaidaProduto>

  public pesquisaSaida : string = ''
  public dataHoje : Date = new Date(Date.now())
  public dataAjustada : string
  public alert : boolean = true

  public page : number = 1
  public total : number
  

  

  constructor(private saidaService : SaidaService) { }

  ngOnInit():  void {
    this.dataAjustada = this.dataHoje.toISOString().split('T')[0]
    this.listarSaida(this.pesquisaSaida, this.page)
  }

  public async listarSaida(pesquisa : string, pagina : number){
    try{
      if(pesquisa !== ''){
        let res = await this.saidaService.getPesquisaSaidaProduto(pesquisa, pagina);
        this.saidaLista = res.searchOutputDate
        this.total = res.count
      } else{
        let res : Array<SaidaProduto> = await this.saidaService.getSaidaProduto(pagina)
        this.saidaLista = res

        this.saidaService.getQtdSaidaProduto()
        .then((total : number)=>{
         this.total = total
        })
      }
    }catch(erro){
     this.alert = false
    }
  }


  public getPage(event){
    this.page = event
    this.listarSaida(this.pesquisaSaida.replace("-","/").replace("-","/"), this.page)
   }
 

  public pesquisa(pesquisa : string) : void{
    this.pesquisaSaida = pesquisa.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')
    this.listarSaida(this.pesquisaSaida.replace("-","/").replace("-","/"), this.page)
  }

  public limparPesquisa(){
    location.reload()
  }

}

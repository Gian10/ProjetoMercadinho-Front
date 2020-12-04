import { Component, OnInit } from '@angular/core';
import {EntradaProduto} from '../model/entrada-produto'
import {EntradaService} from '../services/entrada-service'
import {ProdutoService} from '../services/produto-service'

@Component({
  selector: 'app-entrada-listar',
  templateUrl: './entrada-listar.component.html',
  styleUrls: ['./entrada-listar.component.css'],
  providers: [EntradaService, ProdutoService]
})
export class EntradaListarComponent implements OnInit {


  public entradaLista : Array<EntradaProduto> = []


  public pesquisaEntrada : string = ''
  public dataHoje : Date = new Date(Date.now())
  public dataAjustada : string
  public alert : boolean = true
  public msgTabelaVazia : string

  public page : number = 1
  public total : number

  
  constructor(private entradaService : EntradaService) { }


  ngOnInit(): void {
    this.dataAjustada = this.dataHoje.toISOString().split('T')[0]
    this.listarEntrada(this.pesquisaEntrada, this.page)
  }


  public async listarEntrada(pesquisa : string, pagina : number){
    try{
      if(pesquisa !== ''){
        let res = await this.entradaService.getPesquisaEntradaProduto(pesquisa, pagina);
        if(res.nRecords == 0 || res.searchInputProducts)
          this.msgTabelaVazia = "SEM DADOS DE ENTRADA"
        
        this.entradaLista = res.searchInputProducts
        this.total = res.nRecords       
      } else{
        let res = await this.entradaService.getInputPage(pagina)
        this.entradaLista = res
        if(res.length == 0)
          this.msgTabelaVazia = "SEM DADOS DE ENTRADA"
        
        this.entradaService.getCountInput()
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
   this.listarEntrada(this.pesquisaEntrada.replace("-","/").replace("-","/"), this.page)
  }


  public pesquisa(pesquisa : string) : void{
    this.pesquisaEntrada = pesquisa.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')
    this.listarEntrada(this.pesquisaEntrada.replace("-","/").replace("-","/"), this.page)
  }


  public limparPesquisa(){
    location.reload()
  }

}

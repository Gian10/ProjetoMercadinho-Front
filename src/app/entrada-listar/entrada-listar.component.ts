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

  public entradaLista : Array<EntradaProduto>

  public tamanhoEntrada : number
  public pesquisaEntrada : string = ''


  // objeto de paginação
  produtoPaginacao : any = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.entradaLista
  };


  // montar a personalização da paginação
  public maxSize: number = 1000
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Próximo',
  };


  constructor(private entradaService : EntradaService, private produtoService : ProdutoService) { }


  ngOnInit(): void {
    this.listarEntrada(this.pesquisaEntrada)
    console.log("teste")
  }


  public async listarEntrada(pesquisa : string){
    if(pesquisa !== ''){
      let res: Array<EntradaProduto> = await this.entradaService.getPesquisaEntradaProduto(pesquisa);
      this.entradaLista = res
    } else{
      let res : Array<EntradaProduto> = await this.entradaService.getEntradaProduto()
      this.entradaLista = res
      this.tamanhoEntrada = res.length
    }
  }

   // método de evento ao clique da pagina
   public onPageChange(event){
    //console.log(event)
    this.produtoPaginacao.currentPage = event;
  }

  public pesquisa(pesquisa : string) : void{
    this.pesquisaEntrada = pesquisa.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')
    this.listarEntrada(this.pesquisaEntrada.replace("-","/").replace("-","/"))
  }

}

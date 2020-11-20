import { Component, OnInit } from '@angular/core';
import {ProdutoService} from '../services/produto-service'
import { Produto } from '../model/produto-model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
  providers: [ProdutoService]
})
export class EditarProdutoComponent implements OnInit  {

  public produto : Array<Produto> = []
  public produtoPesquisa : string = ''

  public tamanhoProduto : number

  // objeto de paginação
  produtoPaginacao : any = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.produto
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


  constructor(private serviceProduto : ProdutoService) { }


  ngOnInit() {
    this.listarProduto(this.produtoPesquisa) 
  }


  public async listarProduto(pesquisa : string){
    try{
      if(pesquisa !== ''){
        let response = await this.serviceProduto.pesquisaProduto(pesquisa)
        this.produto = response
        this.tamanhoProduto = response.length
      }else{
        let response = await this.serviceProduto.getProduto()
        this.produto = response
        this.tamanhoProduto = response.length
      } 
    }catch(erro){
      alert("ERRO DO SERVIDOR. TESTE NOVAMENTO MAIS TARDE!")
    }
  }

  // método de evento ao clique da pagina
  public onPageChange(event){
    this.produtoPaginacao.currentPage = event;
  }

// método deletar
  public async deletePost(id : number){
    await this.serviceProduto.deleleProduto(id) 
    this.refreshPage()       
  }

// método de atualização da pagina
  public refreshPage() {
    location.reload()
  }

// pesquisa
  public pesquisar(pesquisa : string) : void{
    this.produtoPesquisa = pesquisa
    this.listarProduto(this.produtoPesquisa.trim())
  }
}

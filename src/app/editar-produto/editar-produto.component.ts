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

  public produto : Array<Produto>
  public produtoPesquisa : string = ''

  public tamanhoProduto : number
  public alert : boolean = true

  public page : number = 1
  public total : number
  public msgTabelaVazia : string


  constructor(private serviceProduto : ProdutoService) { }


  ngOnInit() {
    this.listarProduto(this.produtoPesquisa, this.page) 
  }


  public async listarProduto(pesquisa : string, pagina : number){
    try{
      if(pesquisa !== ''){
        let response = await this.serviceProduto.pesquisaProduto(pesquisa, pagina)
        this.produto = response.products
        this.total = response.countProducts
      }else{
        let response = await this.serviceProduto.getProduto(pagina)
        this.produto = response.products
        this.total = response.countProducts
        if(response.countProducts == 0 || response.products.length == 0){
          this.msgTabelaVazia = "SEM DADOS DE PRODUTOS "
        }
      } 
    }catch(erro){
      this.alert = false
    }
  }

  // método de evento ao clique da pagina
  public getPage(event){
    this.page = event
    this.listarProduto(this.produtoPesquisa.trim(), this.page)
   
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
    this.listarProduto(this.produtoPesquisa.trim(), this.page)
  }
}

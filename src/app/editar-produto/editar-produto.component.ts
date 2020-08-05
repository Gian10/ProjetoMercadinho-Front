import { Component, OnInit } from '@angular/core';
import {ProdutoService} from '../services/produto-service'
import { Produto } from '../model/produto-model';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
  providers: [ProdutoService]
})
export class EditarProdutoComponent implements OnInit  {

  public produto : Array<Produto>
  public produtoPesquisa : string = ''

  public subjectPesquisa : Subject<string> = new Subject<string>()

  public tamanhoProduto : number

  // objeto de paginação
  produtoPaginacao : any = {
    itemsPerPage: 3,
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



  public listarProduto(pesquisa : string): void{
    if(pesquisa !== ''){
      this.serviceProduto.pesquisa(pesquisa)
      .then((pesquisaProduto: Array<Produto>)=>{
        this.produto = pesquisaProduto
        //console.log(pesquisaProduto)
      })
    }else{
      this.serviceProduto.GetProduto()
      .then((produto : Array<Produto>)=>{
        this.produto = produto
        this.tamanhoProduto = this.produto.length
      //console.log(this.tamanhoProduto)    
      })
    } 
  }

  // método de evento ao clique da pagina
  public onPageChange(event){
    //console.log(event)
    this.produtoPaginacao.currentPage = event;
  }


// método deletar
  public deletePost(id : number){
    this.serviceProduto.DeleleProduto(id)
    .then((response : boolean)=>{
      if(response){
        this.refreshPage()      
      }
    })

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

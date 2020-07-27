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

  ngOnInit(): void {
    this.listarProduto()
  }



  public listarProduto(): void{
     this.serviceProduto.GetProduto()
    .then((produto : Array<Produto>)=>{
      this.produto = produto
      this.tamanhoProduto = this.produto.length
      //console.log(this.tamanhoProduto)
      
    })
  }

  // método de evento ao clique da pagina
  onPageChange(event){
    //console.log(event)
    this.produtoPaginacao.currentPage = event;
  }



  deletePost(id : number){
    this.serviceProduto.DeleleProduto(id)
    .then((response : boolean)=>{
      if(response){
        this.refreshPage()      
      }
    })

  }

// método de atualização da pagina
  refreshPage() {
    location.reload()
  }
}

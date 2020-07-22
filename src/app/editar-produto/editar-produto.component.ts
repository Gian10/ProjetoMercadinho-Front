import { Component, OnInit } from '@angular/core';
import {ProdutoService} from '../services/produto-service'
import { Produto } from '../model/produto-model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
  providers: [ProdutoService]
})
export class EditarProdutoComponent implements OnInit {

  public produto : Produto

  constructor(private serviceProduto : ProdutoService) { }

  ngOnInit(): void {
    this.listarProduto()
  }

  public listarProduto(): void{
     this.serviceProduto.GetProduto()
    .then((produto : Produto)=>{
      this.produto = produto
    })
  }

}

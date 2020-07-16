import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Produto} from '../model/produto-model'


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  @ViewChild("cadProduto") public cadProduto : NgForm

  

  public produto : Produto


  constructor() { }

  ngOnInit(): void {
  }

  public cadastrarProduto() : void{

    let cadastroProduto : Produto = new Produto(
      this.cadProduto.value.nomeProduto,
      this.cadProduto.value.codigo,
      this.cadProduto.value.preco,
      this.cadProduto.value.estoque
    )
    
    console.log(this.cadProduto)

  }

}

import { Component, OnInit } from '@angular/core';
import {ProdutoService} from '../services/produto-service'
import {EntradaService} from '../services/entrada-service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import { Produto } from '../model/produto-model';
import {EntradaProduto} from '../model/entrada-produto'

import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-entrada-produto',
  templateUrl: './entrada-produto.component.html',
  styleUrls: ['./entrada-produto.component.css'],
  providers: [ProdutoService, EntradaService]
})

export class EntradaProdutoComponent implements OnInit {
  public entradaProduto : FormGroup = new FormGroup({
    "data" : new FormControl(),
    "codigo" : new FormControl(null),
    "nomeProduto" : new FormControl(null),
    "precoCusto" : new FormControl(null),
    "precoVenda" : new FormControl(null),
    "quantidade" : new FormControl(null),
    "total" : new FormControl(null)
  })

  public dataAtual : Date = new Date(Date.now())

  public qtd : number = 1
  public totalProduto : number = 0
  public valorProduto : number


  constructor(private produtoService : ProdutoService, 
    private router : ActivatedRoute, 
    private redirect : Router, 
    private entradaService : EntradaService) { }

  ngOnInit(): void {

    let dataHoje = this.dataAtual.toLocaleDateString() + " "+ this.dataAtual.getHours()+":"+  (this.dataAtual.getMinutes() < 10 ?'0':'') +this.dataAtual.getMinutes()
   

    this.router.params.subscribe((parametro : Params)=>{
      this.produtoService.getProdutoId(parametro.id)
      .then((produtoId : Produto)=>{
        this.entradaProduto.get('data').setValue(dataHoje)
        this.entradaProduto.get('codigo').setValue(produtoId[0].codigo_produto)
        this.entradaProduto.get('nomeProduto').setValue(produtoId[0].nome_produto)
        this.entradaProduto.get('precoCusto').setValue(produtoId[0].preco_custo)
        this.entradaProduto.get('precoVenda').setValue(produtoId[0].preco_venda)
        this.entradaProduto.get('quantidade').setValue(1)

        this.valorProduto = produtoId[0].preco_custo
        this.totalProduto = this.valorProduto * this.qtd          
      })
    })
  }


  // método de cadastro
  public async cadastrarEntrada(){

    let entrada : EntradaProduto = new EntradaProduto(
      this.entradaProduto.value.data,
      this.entradaProduto.value.codigo,
      this.entradaProduto.value.nomeProduto,
      this.entradaProduto.value.precoCusto,
      this.entradaProduto.value.precoVenda,
      this.entradaProduto.value.quantidade,
      this.totalProduto
    )

    let response = await this.entradaService.postEntrada(entrada)
    // pegar produto da entrada
    //let produtoAtual = await this.entradaService.getProdutoCodigo(response.codigo_produto)
    console.log(response)

    // calcular o estoque atual
    //let estoqueAtual = produtoAtual[0].estoque + response.quantidade

    // let produtoEstoqueNovo : Produto = new Produto
    // (produtoAtual[0].nome_produto, produtoAtual[0].codigo_produto, produtoAtual[0].preco_custo, 
    //   produtoAtual[0].preco_venda, estoqueAtual)
    // produtoEstoqueNovo.produto_id = produtoAtual[0].produto_id

    //console.log(produtoEstoqueNovo)

    //await this.entradaService.putEstoqueProduto(produtoEstoqueNovo)

    //this.voltar()
  }


  // método de clique no campo quantidade para calcular o valor total da entrada
  public onChange($event){
   this.qtd = this.entradaProduto.value.quantidade
   
   if(this.qtd == 0){
      this.entradaProduto.get('quantidade').setValue(1) 
      this.qtd = 1
   }
   this.totalProduto = this.valorProduto * this.qtd
  }


  // método para voltar para pagina anterior
  public voltar(): void{
    this.redirect.navigate(["/editar-produto"])
  }
}

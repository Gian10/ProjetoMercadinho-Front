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
        this.entradaProduto.get('codigo').setValue(produtoId[0].codigo)
        this.entradaProduto.get('nomeProduto').setValue(produtoId[0].nome)
        this.entradaProduto.get('precoCusto').setValue(produtoId[0].precoCusto)
        this.entradaProduto.get('precoVenda').setValue(produtoId[0].precoVenda)
        this.entradaProduto.get('quantidade').setValue(1)

        this.valorProduto = produtoId[0].precoCusto
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

    let res = await this.entradaService.postEntrada(entrada)

    let produtoAtual = await this.entradaService.getProdutoCodigo(res.produto_codigo)

    // Essa logica vai ser feita na api
    let estoqueAtual = produtoAtual[0].estoque + res.quantidade
    let produtoEstoqueNovo : Produto = new Produto
    (produtoAtual[0].nome, 
      produtoAtual[0].codigo, 
      produtoAtual[0].precoCusto, 
      produtoAtual[0].precoVenda, 
      estoqueAtual)

      produtoEstoqueNovo.id = produtoAtual[0].id

    await this.entradaService.putEstoqueProduto(produtoEstoqueNovo)
    this.redirect.navigate(["/editar-produto"])
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

import { Component, OnInit } from '@angular/core';
import {SaidaService} from '../services/saida-service'
import {ProdutoService} from '../services/produto-service'
import {SaidaProduto} from '../model/saida-produto'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Produto } from '../model/produto-model';

@Component({
  selector: 'app-saida-produto',
  templateUrl: './saida-produto.component.html',
  styleUrls: ['./saida-produto.component.css'],
  providers: [SaidaService, ProdutoService]
})
export class SaidaProdutoComponent implements OnInit {

  public cadSaidaProduto : FormGroup = new FormGroup({
    "data" : new FormControl(null),
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
  public produto_id : number
  public alert : boolean = true

  constructor(private route : ActivatedRoute, 
    private saidaService : SaidaService,
    private produtoService : ProdutoService,
    private redirect : Router
    ) { }

  ngOnInit(): void {
    let dataSaida = this.dataAtual.toLocaleDateString() + " " + this.dataAtual.getHours() + ":" + (this.dataAtual.getMinutes() < 10 ? "0" : "") + this.dataAtual.getMinutes()
    try{
      this.route.params.subscribe((parametro : Params)=>{
        this.produtoService.getProdutoId(parametro.id)
        .then((produtoId : Produto)=>{
          this.cadSaidaProduto.get('data').setValue(dataSaida)  
          this.cadSaidaProduto.get('codigo').setValue(produtoId[0].codigo_produto)
          this.cadSaidaProduto.get('nomeProduto').setValue(produtoId[0].nome_produto)
          this.cadSaidaProduto.get('precoCusto').setValue(produtoId[0].preco_custo)
          this.cadSaidaProduto.get('precoVenda').setValue(produtoId[0].preco_venda)
          this.cadSaidaProduto.get('quantidade').setValue(1)
          this.valorProduto = produtoId[0].preco_venda
          this.totalProduto = this.valorProduto * this.qtd
          this.produto_id = parametro.id
        })
      })
    }catch(erro){
      this.alert = false
    }
  }


  public async cadastroSaidaProduto(){
    try{
      let saidaProduto : SaidaProduto = new SaidaProduto(
        this.cadSaidaProduto.value.data,
        this.cadSaidaProduto.value.codigo,
        this.cadSaidaProduto.value.nomeProduto,
        this.cadSaidaProduto.value.precoCusto,
        this.cadSaidaProduto.value.precoVenda,
        this.cadSaidaProduto.value.quantidade,
        this.totalProduto) 
  
      await this.saidaService.postSaidaProduto(saidaProduto)
      
      let responseProdutoCodigo = await this.produtoService.getProdutoId(this.produto_id)
  
      let estoqueAtual = responseProdutoCodigo[0].estoque - saidaProduto.quantidade
  
      let produtoSaida : Produto = new Produto(responseProdutoCodigo[0].nome_produto,
        responseProdutoCodigo[0].codigo_produto, responseProdutoCodigo[0].preco_custo, responseProdutoCodigo[0].preco_venda, estoqueAtual)
        produtoSaida.produto_id = this.produto_id
  
      await this.produtoService.putProdutoId(produtoSaida)
      this.redirect.navigate(["/editar-produto"])
    }catch(erro){
     this.alert = false
    }
  }


  public voltar(): void{
    this.redirect.navigate(["/editar-produto"])
  }

  
  public onChange($event){
    this.qtd = this.cadSaidaProduto.value.quantidade
    if(this.qtd == 0){
      this.cadSaidaProduto.get('quantidade').setValue(1)
      this.qtd = 1
    }
    this.totalProduto = this.valorProduto * this.qtd
   }

}

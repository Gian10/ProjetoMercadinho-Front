import { Component, OnInit } from '@angular/core';
import {ProdutoService} from '../services/produto-service'
import {ActivatedRoute, Params} from '@angular/router'
import { Produto } from '../model/produto-model';
import {DatePipe} from '@angular/common'

import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-entrada-produto',
  templateUrl: './entrada-produto.component.html',
  styleUrls: ['./entrada-produto.component.css'],
  providers: [ProdutoService]
})
export class EntradaProdutoComponent implements OnInit {
  public entradaProduto : FormGroup = new FormGroup({
    "data" : new FormControl(),
    "codigo" : new FormControl(null),
    "nomeProduto" : new FormControl(null),
    "preco" : new FormControl(null),
    "quantidade" : new FormControl(null),
    "total" : new FormControl(null)
  })

  public dataHoje : number = Date.now()

  public qtd : number = 1
  public totalProduto : number = 0
  public valorProduto : number


  constructor(private produtoService : ProdutoService, private router : ActivatedRoute) { }

  ngOnInit(): void {

    this.router.params.subscribe((parametro : Params)=>{
      this.produtoService.GetProdutoId(parametro.id)
      .then((produtoId : Produto)=>{
        this.entradaProduto.get('data').setValue(this.dataHoje)
        this.entradaProduto.get('codigo').setValue(produtoId[0].codigo)
        this.entradaProduto.get('nomeProduto').setValue(produtoId[0].nome)
        this.entradaProduto.get('preco').setValue(produtoId[0].preco)
        this.entradaProduto.get('quantidade').setValue(1) 
        this.valorProduto = produtoId[0].preco
         
          
      })

    })

  }

  

  public onChange($event){
    let valorAtual = 1

   this.qtd = this.entradaProduto.value.quantidade

   if(this.qtd == 0){
      this.entradaProduto.get('quantidade').setValue(1) 
      this.qtd = 1
   }

  
   this.totalProduto = this.valorProduto * this.qtd
   console.log(this.qtd)
   console.log(this.totalProduto)
}

}

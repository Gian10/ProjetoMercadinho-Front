import { Component, OnInit } from '@angular/core';
import {ProdutoService} from '../services/produto-service'
import {ActivatedRoute, Params} from '@angular/router'
import { Router } from '@angular/router';
import { Produto } from '../model/produto-model';

import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-editar-produto-id',
  templateUrl: './editar-produto-id.component.html',
  styleUrls: ['./editar-produto-id.component.css'],
  providers: [ProdutoService]
})

export class EditarProdutoIdComponent implements OnInit {
   public cadProduto : FormGroup = new FormGroup({
        "nomeProduto" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
        "codigo" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
        "precoCusto" : new FormControl(null, [Validators.required]),
        "precoVenda" : new FormControl(null, [Validators.required]),
        "estoque" : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(40)])
      });

  public produtoId : Produto
  public proId : number

  constructor(private produtoServiceId : ProdutoService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((paramentro : Params)=>{
      this.produtoServiceId.getProdutoId(paramentro.id)
      .then((produtoId : Produto)=>{
        this.produtoId = produtoId
        this.cadProduto.get('nomeProduto').setValue(this.produtoId[0].nome_produto)
        this.cadProduto.get('codigo').setValue(this.produtoId[0].codigo_produto)
        this.cadProduto.get('precoCusto').setValue(this.produtoId[0].preco_custo)
        this.cadProduto.get('precoVenda').setValue(this.produtoId[0].preco_venda)
        this.cadProduto.get('estoque').setValue(this.produtoId[0].estoque)
      })
      this.proId = paramentro.id
    })
  }


  public async AtualizarProduto(){
    if(this.cadProduto.status === "INVALID"){
      this.cadProduto.get('nomeProduto').markAsTouched()
      this.cadProduto.get('codigo').markAsTouched()
      this.cadProduto.get('precoCusto').markAsTouched()
      this.cadProduto.get('precoVenda').markAsTouched()
      this.cadProduto.get('estoque').markAsTouched()
    }else{
      let cadastroProduto : Produto = new Produto(
        this.cadProduto.value.nomeProduto,
        this.cadProduto.value.codigo,
        this.cadProduto.value.precoCusto,
        this.cadProduto.value.precoVenda,
        this.cadProduto.value.estoque)
        cadastroProduto.produto_id = this.proId
        
      await this.produtoServiceId.putProdutoId(cadastroProduto)
      this.router.navigate(["/editar-produto"])
    }
  }

  
  public voltar() : void{
    this.router.navigate(["/editar-produto"])
  }
}

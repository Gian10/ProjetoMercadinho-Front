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
        "preco" : new FormControl(null, [Validators.required]),
        "estoque" : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(40)])
      });

  public produtoId : Produto
  public proId : number

  constructor(private produtoServiceId : ProdutoService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((paramentro : Params)=>{
      this.produtoServiceId.GetProdutoId(paramentro.id)
      .then((produtoId : Produto)=>{
        this.produtoId = produtoId
        this.cadProduto.get('nomeProduto').setValue(this.produtoId[0].nome)
        this.cadProduto.get('codigo').setValue(this.produtoId[0].codigo)
        this.cadProduto.get('preco').setValue(this.produtoId[0].preco)
        this.cadProduto.get('estoque').setValue(this.produtoId[0].estoque)
      })
      // inserindo o id nesta variavel
      this.proId = paramentro.id
    })
  }


  public AtualizarProduto() : void{
    if(this.cadProduto.status === "INVALID"){
      this.cadProduto.get('nomeProduto').markAsTouched()
      this.cadProduto.get('codigo').markAsTouched()
      this.cadProduto.get('preco').markAsTouched()
      this.cadProduto.get('estoque').markAsTouched()
    }else{
      let cadastroProduto : Produto = new Produto(
        this.cadProduto.value.nomeProduto,
        this.cadProduto.value.codigo,
        this.cadProduto.value.preco,
        this.cadProduto.value.estoque)
        cadastroProduto.id = this.proId
        
      this.produtoServiceId.PutProdutoId(cadastroProduto)
        .then((produto : boolean)=>{
         if(produto){
          this.router.navigate(["/editar-produto"])
         }else{
          this.router.navigate(["/editar-produto-id"])
         }
        }) 
    }
  }

  
  public voltar() : void{
    this.router.navigate(["/editar-produto"])
  }
}

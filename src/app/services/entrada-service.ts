import {EntradaProduto} from '../model/entrada-produto'
import {EntradaSaidaTotal} from '../model/entrada-saida-total'
import {Produto} from '../model/produto-model'

import {apiEntrada} from '../../app-api'
import {apiEntradaSaidaTotal} from '../../app-api'
import {apiProduto} from '../../app-api'

import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'

const httpOption={
    headers : new HttpHeaders({
        "Content-Type" : "application/json"
    })
}

@Injectable()
export class EntradaService{

    public entradaTotal : number
    public entradaAtual : number
    public qtd : number
    public codigoProduto : string

    constructor(private http : HttpClient){}


    async PostEntrada(entrada : EntradaProduto){
        return await this.http.post<EntradaProduto>(`${apiEntrada}`, entrada).toPromise()
        .then((entrada : EntradaProduto)=>{

            this.entradaTotal = entrada.total

            this.qtd = entrada.quantidade
            this.codigoProduto = entrada.produtoCodigo
            this.GetProdutoCodigo(this.codigoProduto)

            this.GetSomaEntradaTotal()
        })
        .catch((erro : any)=>{
            console.log(erro)
        })
    }


    async GetSomaEntradaTotal(){
        return await this.http.get<Array<EntradaSaidaTotal>>(`${apiEntradaSaidaTotal}`, httpOption).toPromise()
        .then((entradaSaidaTotal : Array<EntradaSaidaTotal>)=>{

           if(entradaSaidaTotal.length === 0 ){
                let entradaSaida : EntradaSaidaTotal = new EntradaSaidaTotal(this.entradaTotal)
                this.PostEntradaTotal(entradaSaida)             
           }else{
              this.entradaAtual =  entradaSaidaTotal[0].entradaValor + this.entradaTotal
              let entradaNova : EntradaSaidaTotal = new EntradaSaidaTotal(this.entradaAtual)
              this.PutEntradaTotal(entradaNova)
           }       
        })
    }


    async PostEntradaTotal(valorEntrada : EntradaSaidaTotal){
        return await this.http.post<EntradaSaidaTotal>(`${apiEntradaSaidaTotal}`, valorEntrada).toPromise()
        .then((entradaTotal : EntradaSaidaTotal)=>{
            console.log(entradaTotal)
        })
    }


    async PutEntradaTotal(valorNovaEntrada : EntradaSaidaTotal){
        return await this.http.put<EntradaSaidaTotal>(`${apiEntradaSaidaTotal}/${1}`, valorNovaEntrada).toPromise()
        .then((valorAtualEntrada : EntradaSaidaTotal)=>{
            console.log(valorAtualEntrada)
           
        })
    }

    async GetEntradaTotal(){
        return await this.http.get<Array< EntradaSaidaTotal>>(`${apiEntradaSaidaTotal}`, httpOption).toPromise()
        .then((entradaListar : Array< EntradaSaidaTotal>)=>{
            console.log(entradaListar)
            return entradaListar
        })
    }

    async GetProdutoCodigo(codigo : string){
        return await this.http.get<Produto>(`${apiProduto}?codigo=${codigo}`).toPromise()
        .then((produtoCodigo : Produto)=>{
            
            produtoCodigo[0].estoque = produtoCodigo[0].estoque + this.qtd 
            
        
            let id = produtoCodigo[0].id
            let produtoAtual : Produto = new Produto(produtoCodigo[0].nome, produtoCodigo[0].codigo, produtoCodigo[0].preco,
                produtoCodigo[0].estoque)

            produtoAtual.id = id
            console.log(produtoAtual)

            this.PutEstoqueProduto(produtoAtual)
        })  
    }

    async PutEstoqueProduto(novoEstoqueProduto){
        return await this.http.put<Produto>(`${apiProduto}/${novoEstoqueProduto.id}`, novoEstoqueProduto).toPromise()
        .then((novoProdutoEstoque : Produto)=>{
            console.log(novoProdutoEstoque)
        })

    }
}
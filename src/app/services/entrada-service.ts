import {EntradaProduto} from '../model/entrada-produto'
import {EntradaSaidaTotal} from '../model/entrada-saida-total'
import {Produto} from '../model/produto-model'

import {apiEntrada} from '../../app-api'
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

    constructor(private http : HttpClient){}


    async postEntrada(entradaProduto : EntradaProduto) : Promise<EntradaProduto>{
        let entrada : EntradaProduto = await this.http.post<EntradaProduto>(`${apiEntrada}`, entradaProduto).toPromise();
        return entrada
    }

    getProdutoCodigo(codigo : string) : Promise<Produto>{
        let produtoCodigo =  this.http.get<Produto>(`${apiProduto}?codigo=${codigo}`).toPromise() 
        return produtoCodigo
    }

    putEstoqueProduto(novoEstoqueProduto) : Promise<Produto>{
        let novoProdutoEstoque =  this.http.put<Produto>(`${apiProduto}/${novoEstoqueProduto.id}`, novoEstoqueProduto).toPromise()
        return novoProdutoEstoque
    }

    getEntradaProduto(): Promise<Array<EntradaProduto>>{
        let res = this.http.get<Array<EntradaProduto>>(`${apiEntrada}`, httpOption).toPromise()
        return res
    }

    getPesquisaEntradaProduto(pesquisa : string): Promise<Array<EntradaProduto>> {
        return this.http.get<Array<EntradaProduto>>(`${apiEntrada}/?dataVenda=${pesquisa}`).toPromise();
    }
}
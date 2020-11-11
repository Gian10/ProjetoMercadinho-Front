import {EntradaProduto} from '../model/entrada-produto'
import {Produto} from '../model/produto-model'

import {apiEntrada} from '../../app-api'
import {apiProduto} from '../../app-api'

import {environment} from '../../environments/environment'

import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'

const httpOption={
    headers : new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization" : ""
    })
}

@Injectable()
export class EntradaService{

    constructor(private http : HttpClient){}


    postEntrada(entradaProduto : EntradaProduto) : Promise<EntradaProduto>{
        let entrada =  this.http.post<EntradaProduto>(`${environment.api}/input`, entradaProduto).toPromise();
        return entrada
    }

    putEstoqueProduto(novoEstoqueProduto : Produto) : Promise<Produto>{
        let novoProdutoEstoque =  this.http.put<Produto>(`${environment.api}/products/${novoEstoqueProduto.produto_id}`, novoEstoqueProduto).toPromise()
        return novoProdutoEstoque
    }

    getEntradaProduto(): Promise<Array<EntradaProduto>>{
        let res = this.http.get<Array<EntradaProduto>>(`${environment.api}/input`).toPromise()
        console.log(res)
        return res
    }

    getPesquisaEntradaProduto(pesquisa : string): Promise<Array<EntradaProduto>> {
        return this.http.get<Array<EntradaProduto>>(`${apiEntrada}/?dataVenda=${pesquisa}`).toPromise();
    }
}
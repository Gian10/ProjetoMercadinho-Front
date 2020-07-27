import {Produto} from '../model/produto-model'

import {apiProduto} from '../../app-api'

import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Injectable} from '@angular/core'
import { Observable } from 'rxjs'

const httpOption ={
    headers : new HttpHeaders({
        "Content-Type" : "application/json"
    })
}

@Injectable()
export class ProdutoService{

    constructor(private http : HttpClient){}

    async PostProduto(produto : Produto){
        return await this.http.post<Produto>(`${apiProduto}`, produto).toPromise()
        .then((prod : Produto)=>{
            return prod
        })      
        
    }

    async GetProduto(){
        return await this.http.get<Array<Produto>>(`${apiProduto}`, httpOption).toPromise()
        .then((listaProduto : Array<Produto>)=>{
            return listaProduto
        })
    }

    async GetProdutoId(id : number){
        return await this.http.get<Produto>(`${apiProduto}?id=${id}`).toPromise()
        .then((produto : Produto)=>{
            return produto
        })
    }

    async PutProdutoId(putProduto : Produto){
        return await this.http.put<Produto>(`${apiProduto}/${putProduto.id}`, putProduto, httpOption).toPromise()
        .then((produtoAtualizado : Produto)=>{
            return true
        })
        .catch((erro : any)=>{
            return false
        })
    }

    async DeleleProduto(id : number){
        return await this.http.delete<Produto>(`${apiProduto}/${id}`, httpOption).toPromise()
        .then((ok : any)=>{
            return true
        })
        .catch((erro : any)=>{
            return false
        })

    }
    
    
}
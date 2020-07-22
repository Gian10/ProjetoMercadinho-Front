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
        return await this.http.get<Produto>(`${apiProduto}`, httpOption).toPromise()
        .then((listaProduto : Produto)=>{
            return listaProduto
        })
    }

}
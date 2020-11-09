import {Produto} from '../model/produto-model'

import {apiProduto} from '../../app-api'

import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Injectable} from '@angular/core'
import { Observable, pipe } from 'rxjs'



@Injectable()
export class ProdutoService{

    constructor(private http : HttpClient){}

    postProduto(produto : Produto) : Promise<Produto>{
        let response = this.http.post<Produto>(`${apiProduto}`, produto).toPromise() 
        return response
    }

    getProduto() : Promise<Array<Produto>>{
        let response = this.http.get<Array<Produto>>(`${apiProduto}`).toPromise()
        return response
    }

    getProdutoId(id : number) : Promise<Produto>{
        let response = this.http.get<Produto>(`${apiProduto}?id=${id}`).toPromise()
        return response
    }

    putProdutoId(putProduto : Produto) : Promise<Produto>{
        let response = this.http.put<Produto>(`${apiProduto}/${putProduto.id}`, putProduto).toPromise()
        return response
    }

    deleleProduto(id : number): Promise<Produto>{
        let response = this.http.delete<Produto>(`${apiProduto}/${id}`).toPromise()
        return response
    }

    pesquisaProduto(texto : string) : Promise<Array<Produto>>{
        let response =  this.http.get<Array<Produto>>(`${apiProduto}/?nome_like=${texto}`).toPromise()
        return response    
    }    
}
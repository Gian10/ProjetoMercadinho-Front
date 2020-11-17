import {Produto} from '../model/produto-model'

import {apiProduto} from '../../app-api'
import {environment} from '../../environments/environment'

import {HttpClient} from '@angular/common/http'

import {Injectable} from '@angular/core'



@Injectable()
export class ProdutoService{

    constructor(private http : HttpClient){}

    postProduto(produto : Produto) : Promise<Produto>{
        let response = this.http.post<Produto>(`${environment.api}/products`, produto).toPromise() 
        return response
    }

    getProduto() : Promise<Array<Produto>>{
        let response = this.http.get<Array<Produto>>(`${environment.api}/products`).toPromise()
        return response
    }

    getProdutoId(id : number) : Promise<Produto>{
        let response = this.http.get<Produto>(`${environment.api}/products/${id}`).toPromise()
        return response
    }

    putProdutoId(putProduto : Produto) : Promise<Produto>{
        let response = this.http.put<Produto>(`${environment.api}/products/${putProduto.produto_id}`, putProduto).toPromise()
        return response
    }

    deleleProduto(id : number): Promise<Produto>{
        let response = this.http.delete<Produto>(`${environment.api}/products/${id}`).toPromise()
        return response
    }

    pesquisaProduto(texto : string) : Promise<Array<Produto>>{
        let response =  this.http.get<Array<Produto>>(`${environment.api}/products/search?product=${texto}`).toPromise()
        return response    
    }    
}
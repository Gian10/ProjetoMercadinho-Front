import {SaidaProduto} from '../model/saida-produto'

import {apiSaida, apiProduto} from '../../app-api'

import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Injectable} from '@angular/core'
import { Produto } from '../model/produto-model'

const httpOption={
    headers : new HttpHeaders({
        "Content-Type" : "application/json"
    })
}

@Injectable()
export class SaidaService {

    constructor(private http : HttpClient){}

    postSaidaProduto(saida : SaidaProduto) : Promise<SaidaProduto>{
        return this.http.post<SaidaProduto>(`${apiSaida}`, saida, httpOption).toPromise()
    }

    getProdutoCodigo(codigo : string) : Promise<Produto>{
        return this.http.get<Produto>(`${apiProduto}`, httpOption).toPromise()
    }



}
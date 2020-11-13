import {SaidaProduto} from '../model/saida-produto'

import {apiSaida, apiProduto} from '../../app-api'

import {environment} from '../../environments/environment'

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
        return this.http.post<SaidaProduto>(`${environment.api}/output`, saida, httpOption).toPromise()
    }

    getSaidaProduto() : Promise<Array<SaidaProduto>>{
        return this.http.get<Array<SaidaProduto>>(`${environment.api}/output`).toPromise()
    }

    getPesquisaSaidaProduto(pesquisa : string): Promise<Array<SaidaProduto>> {
        return this.http.get<Array<SaidaProduto>>(`${apiSaida}/?dataVenda=${pesquisa}`).toPromise();
    }
}
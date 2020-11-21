import {EntradaProduto} from '../model/entrada-produto'
import {Produto} from '../model/produto-model'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

interface EntradaTotal{
    totalentrada : number
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
        return res
    }

    getPesquisaEntradaProduto(pesquisa : string): Promise<Array<EntradaProduto>> {
        return this.http.get<Array<EntradaProduto>>(`${environment.api}/input/search?date=${pesquisa}`).toPromise();
    }

    async getTotalEntrada(): Promise<number>{
        let res = await this.http.get<EntradaTotal>(`${environment.api}/sumTotalInput`).toPromise()
        return res.totalentrada
    }
}
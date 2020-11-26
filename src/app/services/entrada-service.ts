import {EntradaProduto} from '../model/entrada-produto'
import {Produto} from '../model/produto-model'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

interface EntradaTotal{
    totalentrada : number
}
interface QtdEntrada{
    qtdentrada : number
}

interface EntradaProdutoQtd{
    nRecords : number,
    searchInputProducts : Array<EntradaProduto>
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

    async getCountInput(): Promise<number>{
        let res = await this.http.get<QtdEntrada>(`${environment.api}/input/count`).toPromise()
        return res.qtdentrada   
    }

    getInputPage(page: number): Promise<Array<EntradaProduto>>{
        let res = this.http.get<Array<EntradaProduto>>(`${environment.api}/input?page=${page}`).toPromise()
        return res
    }

    getPesquisaEntradaProduto(pesquisa : string, page : number): Promise<EntradaProdutoQtd> {
        let res = this.http.get<EntradaProdutoQtd>(`${environment.api}/input/search?date=${pesquisa}&page=${page}`).toPromise();
        return res
    }

    async getTotalEntrada(): Promise<number>{
        let res = await this.http.get<EntradaTotal>(`${environment.api}/sumTotalInput`).toPromise()
        return res.totalentrada
    }
}
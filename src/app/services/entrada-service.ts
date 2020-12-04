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

interface PesquisaEntradaProdutoQtd{
    nRecords : number,
    searchInputProducts : Array<EntradaProduto>
}


@Injectable()
export class EntradaService{

    public idUser : number = Number(window.localStorage.getItem('idUser'))

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
        let res = await this.http.get<QtdEntrada>(`${environment.api}/input/count?usuario_id=${this.idUser}`).toPromise()
        return res.qtdentrada   
    }

    getInputPage(pagina: number): Promise<Array<EntradaProduto>>{
        let res = this.http.get<Array<EntradaProduto>>(`${environment.api}/input?page=${pagina}&usuario_id=${this.idUser}`).toPromise()
        return res
    }

    getPesquisaEntradaProduto(pesquisa : string, pagina : number): Promise<PesquisaEntradaProdutoQtd> {
        let res = this.http.get<PesquisaEntradaProdutoQtd>(`${environment.api}/input/search?date=${pesquisa}&page=${pagina}&usuario_id=${this.idUser}`).toPromise();
        return res
    }

    async getTotalEntrada(): Promise<number>{
        let res = await this.http.get<EntradaTotal>(`${environment.api}/sumTotalInput?usuario_id=${this.idUser}`).toPromise()
        return res.totalentrada
    }
}
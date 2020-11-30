import {SaidaProduto} from '../model/saida-produto'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

interface SaidaTotal{
    totalsaida : number
}

interface PesquisaSaidaProdutoQtd{
    count : number,
    searchOutputDate : Array<SaidaProduto>
}


@Injectable()
export class SaidaService {

    constructor(private http : HttpClient){}

    postSaidaProduto(saida : SaidaProduto) : Promise<SaidaProduto>{
        return this.http.post<SaidaProduto>(`${environment.api}/output`, saida).toPromise()
    }

    getSaidaProduto(pagina : number) : Promise<Array<SaidaProduto>>{
        return this.http.get<Array<SaidaProduto>>(`${environment.api}/output?page=${pagina}`).toPromise()
    }

    async getQtdSaidaProduto() : Promise<number>{
        let res = await this.http.get<number>(`${environment.api}/output/count`).toPromise()
        return res
    }

    getPesquisaSaidaProduto(pesquisa : string, pagina : number): Promise<PesquisaSaidaProdutoQtd> {
        let res = this.http.get<PesquisaSaidaProdutoQtd>(`${environment.api}/output/search?date=${pesquisa}&page=${pagina}`).toPromise();
        return res
    }

    async getTotalSaida() : Promise<number> {
       let res = await this.http.get<SaidaTotal>(`${environment.api}/sumTotalOutput`).toPromise() 
       return res.totalsaida
    }
}
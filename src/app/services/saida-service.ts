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

    public idUser : number = Number(window.localStorage.getItem('idUser'))

    constructor(private http : HttpClient){}

    postSaidaProduto(saida : SaidaProduto) : Promise<SaidaProduto>{
        return this.http.post<SaidaProduto>(`${environment.api}/output?usuario_id=${this.idUser}`, saida).toPromise()
    }

    getSaidaProduto(pagina : number) : Promise<Array<SaidaProduto>>{
        return this.http.get<Array<SaidaProduto>>(`${environment.api}/output?page=${pagina}&usuario_id=${this.idUser}`).toPromise()
    }

    async getQtdSaidaProduto() : Promise<number>{
        let res = await this.http.get<number>(`${environment.api}/output/count?usuario_id=${this.idUser}`).toPromise()
        return res
    }

    getPesquisaSaidaProduto(pesquisa : string, pagina : number): Promise<PesquisaSaidaProdutoQtd> {
        let res = this.http.get<PesquisaSaidaProdutoQtd>(`${environment.api}/output/search?date=${pesquisa}&page=${pagina}&usuario_id=${this.idUser}`).toPromise();
        return res
    }

    async getTotalSaida() : Promise<number> {
       let res = await this.http.get<SaidaTotal>(`${environment.api}/sumTotalOutput?usuario_id=${this.idUser}`).toPromise() 
       return res.totalsaida
    }
}
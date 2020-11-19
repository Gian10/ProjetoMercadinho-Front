import {SaidaProduto} from '../model/saida-produto'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

@Injectable()
export class SaidaService {

    constructor(private http : HttpClient){}

    postSaidaProduto(saida : SaidaProduto) : Promise<SaidaProduto>{
        return this.http.post<SaidaProduto>(`${environment.api}/output`, saida).toPromise()
    }

    getSaidaProduto() : Promise<Array<SaidaProduto>>{
        return this.http.get<Array<SaidaProduto>>(`${environment.api}/output`).toPromise()
    }

    getPesquisaSaidaProduto(pesquisa : string): Promise<Array<SaidaProduto>> {
        return this.http.get<Array<SaidaProduto>>(`${environment.api}/output/search?date=${pesquisa}`).toPromise();
    }
}
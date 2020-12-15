import {Produto} from '../model/produto-model'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

interface ProdutoTamanho{
    countProducts : number,
    products : Array<Produto>
}


@Injectable()
export class ProdutoService{

    public idUser : number = Number(window.localStorage.getItem('idUser'))

    constructor(private http : HttpClient){}

    postProduto(produto : Produto) : Promise<Produto>{
        let response = this.http.post<Produto>(`${environment.api}/products?usuario_id=${this.idUser}`, produto).toPromise() 
        return response
    }

    getProduto(pagina : number) : Promise<ProdutoTamanho>{
        let response = this.http.get<ProdutoTamanho>(`${environment.api}/products?page=${pagina}&usuario_id=${this.idUser}`).toPromise()
        return response
    }

    getProdutoId(id : number) : Promise<Produto>{
        let response = this.http.get<Produto>(`${environment.api}/products/${id}?usuario_id=${this.idUser}`).toPromise()
        return response
    }

    putProdutoId(putProduto : Produto) : Promise<Produto>{
        let response = this.http.put<Produto>(`${environment.api}/products/${putProduto.produto_id}?usuario_id=${this.idUser}`, putProduto).toPromise()
        return response
    }

    deleleProduto(id : number): Promise<Produto>{
        let response = this.http.delete<Produto>(`${environment.api}/products/${id}`).toPromise()
        return response
    }

    pesquisaProduto(texto : string, pagina : number) : Promise<ProdutoTamanho>{
        let response =  this.http.get<ProdutoTamanho>(`${environment.api}/products/search?product=${texto}&page=${pagina}&usuario_id=${this.idUser}`).toPromise()
        return response
    }    
}
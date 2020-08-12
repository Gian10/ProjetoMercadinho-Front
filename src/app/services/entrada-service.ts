import {EntradaProduto} from '../model/entrada-produto'
import {apiEntrada} from '../../app-api'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'

const httpOption={
    headers : new HttpHeaders({
        "Content-Type" : "application/json"
    })
}

@Injectable()
export class EntradaService{

    constructor(private http : HttpClient){}

    async PostEntrada(entrada : EntradaProduto){
        return await this.http.post<EntradaProduto>(`${apiEntrada}`, entrada).toPromise()
        .then((entrada : EntradaProduto)=>{
            console.log(entrada)
        })
    }

}
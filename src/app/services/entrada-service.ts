import {EntradaProduto} from '../model/entrada-produto'
import {EntradaSaidaTotal} from '../model/entrada-saida-total'

import {apiEntrada} from '../../app-api'
import {apiEntradaSaidaTotal} from '../../app-api'

import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'

const httpOption={
    headers : new HttpHeaders({
        "Content-Type" : "application/json"
    })
}

@Injectable()
export class EntradaService{

    public entradaTotal : number
    //public entradaSaidaTotal : Promise<EntradaSaidaTotal>

    constructor(private http : HttpClient){}

    async PostEntrada(entrada : EntradaProduto){
        return await this.http.post<EntradaProduto>(`${apiEntrada}`, entrada).toPromise()
        .then((entrada : EntradaProduto)=>{
            //console.log(entrada.total)
            this.entradaTotal = entrada.total
            this.GetEntradaTotal()
        })
        .catch((erro : any)=>{
            console.log(erro)
        })
    }

    async GetEntradaTotal(){
        return await this.http.get<Array<EntradaSaidaTotal>>(`${apiEntradaSaidaTotal}`, httpOption).toPromise()
        .then((entradaSaidaTotal : Array<EntradaSaidaTotal>)=>{

            console.log(entradaSaidaTotal.length)

           if(entradaSaidaTotal.length === 0 ){

                let entradaSaida : EntradaSaidaTotal = new EntradaSaidaTotal(this.entradaTotal)
                //this.PostEntradaTotal(entradaSaida)  
                console.log(entradaSaida)    
           }else{
              //let t =  entradaSaidaTotal[0].entradaValor + this.entradaTotal
              console.log("aaa")
           }
            
        })
    }

    async PostEntradaTotal(valorEntrada : EntradaSaidaTotal){
        return this.http.post<EntradaSaidaTotal>(`${apiEntradaSaidaTotal}`, valorEntrada).toPromise()
        .then((entradaTotal : EntradaSaidaTotal)=>{
            console.log(entradaTotal)
        })
    }

    async PutEntradaTotal(valorNovaEntrada : EntradaSaidaTotal){
        return this.http.put<EntradaSaidaTotal>(`${apiEntradaSaidaTotal}/1`, valorNovaEntrada, httpOption).toPromise()
        .then((valorAtualEntrada : EntradaSaidaTotal)=>{
            console.log(valorAtualEntrada)

        })

    }



}
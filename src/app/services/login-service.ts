import { Usuario } from '../model/usuario-model'
import { Observable, of } from 'rxjs';
import {api} from '../../app-api'

import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'

const httpOption ={
    headers : new HttpHeaders({
        "Content-Type" : "application/json"
    })
}



@Injectable()
export class Service{

    constructor(public http : HttpClient){}

    login(nome : string, senha : string) { 
            return this.http.get(`${api}?nome=${nome}&senha=${senha}`, httpOption)
            .toPromise()
            .then((user : Usuario)=>{
               if( !this.isEmpty(user)){
                window.localStorage.setItem("token", "tokenAcesso")
                return true
               }else{
                return false
               }
            })
            .catch(err=>{
                throw new Error(err.message);  
              });    
    }

    async criarConta(conta: any) {
        
        const result = await this.http.post<any>(`${api}`, conta).toPromise();
        console.log(result)
        return result;
      }

      // método para verificar o retorno da solicitação
     isEmpty(obj) : boolean {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        } 
        return true;
    }
}
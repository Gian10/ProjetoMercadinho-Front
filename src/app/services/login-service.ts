import { Usuario } from '../model/usuario-model'
import {api} from '../../app-api'
import {environment} from '../../environments/environment'

import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'


@Injectable({
    providedIn: 'root'
  })
export class LoginService{

    constructor(public http : HttpClient){}

    async login(user : Usuario) { 

        try{
            let result = await this.http.post<any>(`${environment.api}/login`, user).toPromise()      
            window.localStorage.setItem('idUser', result.id)
            window.localStorage.setItem('nameUser', result.name)
            window.localStorage.setItem("token", result.token)
            return result
        }catch(erro){
            return false
        }
        
    }

    async criarConta(conta: any) {
        const result = await this.http.post<any>(`${api}`, conta).toPromise();
        console.log(result)
        return result;
      }

      getAuthorizationToken(){
          const token = window.localStorage.getItem('token');
          return token;
      }
}
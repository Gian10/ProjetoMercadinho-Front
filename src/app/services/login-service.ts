import { Usuario } from '../model/usuario-model'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

interface Login {
    id: string,
    name: string,
    iat: number,
    exp: number,
    token: string
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(public http: HttpClient) { }

    async login(user: Usuario): Promise<Login> {
        let result = await this.http.post<Login>(`${environment.api}/login`, user).toPromise()
        window.localStorage.setItem('idUser', result.id)
        window.localStorage.setItem('nameUser', result.name)
        window.localStorage.setItem("token", result.token)
        return result
    }

    async criarConta(conta: Usuario) {
        let result = await this.http.post(`${environment.api}/login/cadastroUser`, conta).toPromise();
        return result;
    }

    getAuthorizationToken() {
        const token = window.localStorage.getItem('token');
        return token;
    }
}
import {Usuario} from '../model/usuario-model'
import {HttpClient} from '@angular/common/http' 
import {Injectable} from '@angular/core'
import {environment} from '../../environments/environment'


@Injectable()
export class UsuarioService{


    constructor(private http: HttpClient){}

    putUsuario(usuario: Usuario){
        return this.http.put(`${environment.api}/users/${usuario.id}`, usuario).toPromise()
    }

    getUsuarioId(id: number): Promise<Usuario>{
        let response = this.http.get<Usuario>(`${environment.api}/users/${id}`).toPromise()
        return response
    }
} 
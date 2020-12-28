import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../services/usuario-service'
import {Usuario} from '../model/usuario-model'

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css'],
  providers: [UsuarioService]
})
export class TelaPrincipalComponent implements OnInit {

  public nameUser : string
  public idUser : number

  constructor(private userService : UsuarioService) { }

  ngOnInit(): void {
    let id = window.localStorage.getItem('idUser')
    this.idUser = Number(id)
    this.userService.getUsuarioId(this.idUser)
    .then((user : Usuario)=>{
      this.nameUser = user[0].nome
    })
  }

  public logout(){
    window.localStorage.removeItem('idUser')
    window.localStorage.removeItem('nameUser')
    window.localStorage.removeItem('token')
    location.reload()
  }

   

}

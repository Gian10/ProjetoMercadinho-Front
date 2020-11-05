import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {

  public nameUser : string
  constructor() { }

  ngOnInit(): void {
    this.nameUser = window.localStorage.getItem('nameUser')
  }

  public logout(){
    window.localStorage.removeItem('idUser')
    window.localStorage.removeItem('nameUser')
    window.localStorage.removeItem('token')
    location.reload()
  }

   

}

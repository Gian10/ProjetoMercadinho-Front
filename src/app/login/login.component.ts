import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Usuario} from '../model/usuario-model'
import {Service} from '../services/login-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Service]
})
export class LoginComponent implements OnInit {
 
  @ViewChild("login")   public login : NgForm

  public alerta : boolean

  constructor(private service : Service, private router : Router) { }

  ngOnInit(): void {
  }

  async verificar(){
   
    let resultado = await this.service.login(this.login.value.login, this.login.value.senha)

    if(resultado === true){
      this.router.navigate([""])
    }else{
      this.alerta = false
      //alert("Usuario ou Senha errado")
    }
  }
}

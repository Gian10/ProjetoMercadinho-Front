import { Component, OnInit, Output, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Usuario} from '../model/usuario-model'
import {LoginService} from '../services/login-service'
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
 
  @ViewChild("login")   public login : NgForm

  public alerta : boolean
  public usuario : Usuario 

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
    
  }

  async verificar(){
    let user : Usuario = new Usuario(this.login.value.login, this.login.value.senha) 
   
   
    let resultado = await this.loginService.login(user)
 

    if(resultado){
      this.router.navigate([""])
    }else{
      this.alerta = false
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Usuario} from '../model/usuario-model'
import {LoginService} from '../services/login-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public login : FormGroup = new FormGroup({
    "loginUsuario": new FormControl(null,[Validators.required, Validators.minLength(4), Validators.maxLength(40)]) ,
    "loginSenha": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]) ,
  })
 
  

  public alerta : boolean
  public usuario : Usuario 

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
    
  }

  async verificar(){

    if(this.login.status === "INVALID"){
      this.login.get('loginUsuario').markAsTouched()
      this.login.get('loginSenha').markAsTouched()
    }
    else{
      let verificaLogin : Usuario = new Usuario(this.login.value.loginUsuario,this.login.value.loginSenha)
      try{
        let resultado = await this.loginService.login(verificaLogin)
        this.router.navigate(["/home"])      
      }catch(erro){
       this.alerta = false
      }
    }
  }
}

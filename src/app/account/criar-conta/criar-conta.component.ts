import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service'
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Usuario } from 'src/app/model/usuario-model';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css'],
  providers: [LoginService]
})
export class CriarContaComponent implements OnInit {
  public cadUsuario : FormGroup = new FormGroup({
    "nomeUsuario": new FormControl(null,[Validators.required, Validators.minLength(4), Validators.maxLength(40)]) ,
    "senhaUsuario": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]) ,
  })



  public alerta: boolean
  public usuario: Usuario;
  public alert : boolean = true

  constructor(private serviceLogin: LoginService, private router: Router) { }


  ngOnInit(): void {
  }

  async cadastrarUsuario() {

    if(this.cadUsuario.status === "INVALID"){
      this.cadUsuario.get('nomeUsuario').markAsTouched()
      this.cadUsuario.get('senhaUsuario').markAsTouched()
    }
    else{
      let usuario : Usuario = new Usuario(
        this.cadUsuario.value.nomeUsuario,
        this.cadUsuario.value.senhaUsuario)
      try{
        await this.serviceLogin.criarConta(usuario);
        this.alerta = true
        this.router.navigate([""])
      }catch(erro){
       this.alert = false
      }
    }
   }
}

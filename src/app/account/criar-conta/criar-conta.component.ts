import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login-service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { Usuario } from 'src/app/model/usuario-model';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css'],
  providers: [LoginService]
})
export class CriarContaComponent implements OnInit {

  @ViewChild("criarConta") public criarConta: NgForm

  public alerta: boolean
  public usuario: Usuario;

  constructor(private serviceLogin: LoginService, private router: Router) { }


  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      let usuarios: Usuario = new Usuario(
        this.criarConta.value.login,
        this.criarConta.value.senha)
        
      await this.serviceLogin.criarConta(usuarios);
      this.alerta = true
      this.router.navigate([""])
    }catch (error) {
     alert('ERRO DO SERVIDOR. TENTE NOVAMENTE MAIS TARDE!')
    }
  }
}

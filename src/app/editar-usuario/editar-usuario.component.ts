import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup} from '@angular/forms'
import {Router} from '@angular/router'
import { Usuario } from '../model/usuario-model';
import {UsuarioService} from '../services/usuario-service'

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [UsuarioService]
})
export class EditarUsuarioComponent implements OnInit {
  public editUsuario : FormGroup = new FormGroup({
    "nomeUsuario" : new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
    "novaSenha" : new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
    "confirmaNovaSenha" : new FormControl(null,[Validators.required] )
  })

  public senha : string
  public confSenha : string

  public idUser : string = window.localStorage.getItem('idUser')

  constructor(private redirect: Router, private userService: UsuarioService) { }

  ngOnInit(): void {
    this.userService.getUsuarioId(Number(this.idUser))
    .then((usuarioId : Usuario)=>{
      this.editUsuario.get('nomeUsuario').setValue(usuarioId[0].nome)})
    .catch(_ => alert("ERRO AO EXIBIR DADOS"))
  }


  public async atualizarUsuario(){
    if(this.editUsuario.status === "INVALID" || this.senha !== this.confSenha){
      this.editUsuario.get('nomeUsuario').markAsTouched()
      this.editUsuario.get('novaSenha').markAsTouched()
      this.editUsuario.get('confirmaNovaSenha').markAsTouched()
    }else{
      let usuario : Usuario = new Usuario(this.editUsuario.value.nomeUsuario,
        this.editUsuario.value.novaSenha)
        usuario.id = Number(this.idUser)
        try{
          let res = await this.userService.putUsuario(usuario)
          this.voltar()  
        }catch(e){
          alert("ERRO DO SERVIDOR. TESTE NOVAMENTO MAIS TARDE!")
        }
    }
  }

  public voltar() : void{
    this.redirect.navigate(["/"])
  }

  public verificarNovaSenha(): void{
    this.senha = this.editUsuario.get('novaSenha').value  
  }

  public verificarConfirmaSenha(): void{
    this.confSenha = this.editUsuario.get('confirmaNovaSenha').value
  }

}





















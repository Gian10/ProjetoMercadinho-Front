import {Routes} from '@angular/router'


import {LoginComponent} from '../app/login/login.component'
import {TelaPrincipalComponent} from '../app/tela-principal/tela-principal.component'
//import {AuthenticationComponent} from './layout/authentication/authentication.component'
//import {CreateAccountComponent} from './account/create-account/create-account.component'
import {CriarContaComponent} from './account/criar-conta/criar-conta.component'
import { AuthGuard } from './account/shared/auth.guard'

export const ROUTES : Routes = [

    // verifica se a rota vazia esta autorizada
    {path : "" , component : TelaPrincipalComponent, canActivate:[AuthGuard] },

    // se não tiver autorizada entra aqui
   // children : [

        // usando full a pagina padão será localhost:4200/
        {path : "", redirectTo : "login", pathMatch: "full"},
        {path: "login", component: LoginComponent},
        {path: "criar-conta", component: CriarContaComponent}
     
]
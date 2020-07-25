import {Routes} from '@angular/router'


import {LoginComponent} from '../app/login/login.component'
import {CriarContaComponent} from './account/criar-conta/criar-conta.component'
import {HomeComponent} from '././home/home.component'
import { AuthGuard } from './account/shared/auth.guard'
import {CadastroProdutoComponent} from './cadastro-produto/cadastro-produto.component'
import {EditarProdutoComponent} from './editar-produto/editar-produto.component'
import {EditarProdutoIdComponent} from './editar-produto-id/editar-produto-id.component'

export const ROUTES : Routes = [

    // verifica se a rota vazia esta autorizada
    {path : "" , component : HomeComponent, canActivate:[AuthGuard] },
    {path : "cadastro-produto" , component : CadastroProdutoComponent, canActivate:[AuthGuard]},
    {path: "editar-produto", component: EditarProdutoComponent, canActivate: [AuthGuard]},
    {path : "editar-produto/:id", component: EditarProdutoIdComponent, canActivate: [AuthGuard]},

    // se não tiver autorizada entra aqui
   // children : [

        // usando full a pagina padão será localhost:4200/
        {path : "", redirectTo : "login", pathMatch: "full"},
        {path: "login", component: LoginComponent},
        {path: "criar-conta", component: CriarContaComponent}
     
]
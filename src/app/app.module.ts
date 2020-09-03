import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// injetar pipe de dinheiro em campo preço
import {CurrencyMaskModule} from 'ng2-currency-mask'

// injetar paginação
import {NgxPaginationModule} from 'ngx-pagination'



import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'


// injetar "," no valor
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {HttpClientModule} from '@angular/common/http';
import { TelaPrincipalComponent } from './tela-principal/tela-principal.component'

import {RouterModule} from '@angular/router'
import {ROUTES} from './app-routes';
import { HomeComponent } from './home/home.component';
import { CriarContaComponent } from './account/criar-conta/criar-conta.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { EditarProdutoIdComponent } from './editar-produto-id/editar-produto-id.component';
import { EntradaProdutoComponent } from './entrada-produto/entrada-produto.component';
import { EntradaListarComponent } from './entrada-listar/entrada-listar.component';
import { SaidaProdutoComponent } from './saida-produto/saida-produto.component';
import { SaidaListarComponent } from './saida-listar/saida-listar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TelaPrincipalComponent,
    HomeComponent,
    CriarContaComponent,
    CadastroProdutoComponent,
    EditarProdutoComponent,
    EditarProdutoIdComponent,
    EntradaProdutoComponent,
    EntradaListarComponent,
    SaidaProdutoComponent,
    SaidaListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    CurrencyMaskModule,
    NgxPaginationModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-Br'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

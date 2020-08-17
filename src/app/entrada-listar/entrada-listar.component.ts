import { Component, OnInit } from '@angular/core';
import {EntradaProduto} from '../model/entrada-produto'
import {EntradaService} from '../services/entrada-service'

@Component({
  selector: 'app-entrada-listar',
  templateUrl: './entrada-listar.component.html',
  styleUrls: ['./entrada-listar.component.css'],
  providers: [EntradaService]
})
export class EntradaListarComponent implements OnInit {

  public entradaLista : Array<EntradaProduto>

  public tamanhoEntrada : number

  // objeto de paginação
  produtoPaginacao : any = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.entradaLista
  };


  // montar a personalização da paginação
  public maxSize: number = 1000
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Próximo',
  };

  constructor(private entradaService : EntradaService) { }

  ngOnInit(): void {
    this.entradaService.GetEntradaProduto()
    .then((entradaLista : Array<EntradaProduto>)=>{
      this.entradaLista = entradaLista
      this.tamanhoEntrada = this.entradaLista.length 
    })

  }

   // método de evento ao clique da pagina
   public onPageChange(event){
    //console.log(event)
    this.produtoPaginacao.currentPage = event;
  }

}

import { Component, OnInit } from '@angular/core';
import {SaidaProduto} from '../model/saida-produto'
import {SaidaService} from '../services/saida-service'

@Component({
  selector: 'app-saida-listar',
  templateUrl: './saida-listar.component.html',
  styleUrls: ['./saida-listar.component.css'],
  providers:[SaidaService]
})
export class SaidaListarComponent implements OnInit {

  public saidaLista : Array<SaidaProduto> = []

  public tamanhoSaida : number
  public pesquisaSaida : string = ''
  public dataHoje : Date = new Date(Date.now())
  public dataAjustada : string


  // objeto de paginação
  produtoPaginacao : any = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.saidaLista
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

  constructor(private saidaService : SaidaService) { }

  ngOnInit():  void {
    this.dataAjustada = this.dataHoje.toISOString().split('T')[0]
    this.listarSaida(this.pesquisaSaida)
  }

  public async listarSaida(pesquisa : string){
    try{
      if(pesquisa !== ''){
        let res: Array<SaidaProduto> = await this.saidaService.getPesquisaSaidaProduto(pesquisa);
        this.saidaLista = res
        console.log(res)
      } else{
        let res : Array<SaidaProduto> = await this.saidaService.getSaidaProduto()
        this.saidaLista = res
        this.tamanhoSaida = res.length
      }
    }catch(erro){
      alert("ERRO DO SERVIDOR. TESTE NOVAMENTO MAIS TARDE!")
    }
  }


  public onPageChange(event){
    this.produtoPaginacao.currentPage = event;
  }

  public pesquisa(pesquisa : string) : void{
    this.pesquisaSaida = pesquisa.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')
    this.listarSaida(this.pesquisaSaida.replace("-","/").replace("-","/"))
  }

  public limparPesquisa(){
    location.reload()
  }

}

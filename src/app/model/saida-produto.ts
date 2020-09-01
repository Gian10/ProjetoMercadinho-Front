export class SaidaProduto{
    public saidaId : number
    constructor(
        public dataSaida : number,
        public produtoCodigo : string,
        public produtoNome : string,
        public precoCusto : number,
        public precoVenda : number,
        public quantidade : number,
        public total : number
        ){}
}
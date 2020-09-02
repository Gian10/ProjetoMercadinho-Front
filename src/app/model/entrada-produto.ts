export class EntradaProduto{
    public entradaId : number
    constructor(
        public dataEntrada : number, 
        public produtoCodigo : string,
        public produtoNome : string,
        public precoCusto : number,
        public precoVenda : number,
        public quantidade : number,
        public total : number
        ){}
}
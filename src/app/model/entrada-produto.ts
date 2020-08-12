export class EntradaProduto{
    public entradaId : number
    
    constructor(
        public dataVenda : number, 
        public produtoCodigo : string,
        public produtoNome : string,
        public valorProduto : number,
        public quantidade : number,
        public total : number
        ){}
}
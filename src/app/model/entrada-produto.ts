export class EntradaProduto{
    public entradaId : number
    
    constructor(public dataCompra : Date, 
        public produtoId : number,
        public produtoCodigo : string,
        public produtoNome : string,
        public valorEntrada : number,
        public valorProduto : number
        ){}
}
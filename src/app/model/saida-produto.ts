export class SaidaProduto{
    public saida_id : number
    constructor(
        public data_saida : number,
        public produto_codigo : string,
        public produto_nome : string,
        public preco_custo : number,
        public preco_venda : number,
        public quantidade : number,
        public total : number
        ){}
}
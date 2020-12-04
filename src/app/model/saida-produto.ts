export class SaidaProduto{
    public saida_id : number
    public usuario_id : number
    constructor(
        public data_saida : number,
        public codigo_produto : string,
        public nome_produto : string,
        public preco_custo : number,
        public preco_venda : number,
        public quantidade : number,
        public total : number
        ){}
}
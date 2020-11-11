export class EntradaProduto{
    public entrada_id : number
    constructor(
        public data_entrada : number, 
        public codigo_produto : string,
        public nome_produto : string,
        public preco_custo : number,
        public preco_venda : number,
        public quantidade : number,
        public total : number
        ){}
}
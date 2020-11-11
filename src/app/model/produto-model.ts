export class Produto{
    public produto_id : number
    constructor(public nome_produto : string, 
        public codigo_produto : string, 
        public preco_custo : number,
        public preco_venda : number , 
        public estoque : number){}
}
export class Produto{
    public id : number
    constructor(public nome : string, 
        public codigo : string, 
        public precoCusto : number,
        public precoVenda : number , 
        public estoque : number){}
}
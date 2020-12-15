
beforeEach(() => {
  cy.login()
})

it('VISITAR PAGINA INICIAL', () => {
  cy.visit("http://localhost:4200/home")
  cy.wait(2000)
})

it("VISITAR PAGINA DE CADASTRO DE PRODUTO E REALIZAR O CADASTRO", ()=>{
  cy.visit("http://localhost:4200/cadastro-produto")
  cy.get('[formcontrolname="nomeProduto"]').type("CARNE DE SOL");
  cy.get('[formcontrolname="codigo"]').type("86868")
  cy.get('[formcontrolname="precoCusto"]').type(160)
  cy.get('[formcontrolname="precoVenda"]').type(180)
  cy.get('[formcontrolname="estoque"]').type(10)
  cy.get('.btn-primary').click();
  cy.wait(1000)
  cy.get('.btn-danger').click();
})

it("VISITAR TELA DE PRODUTOS E PESQUISA", ()=>{
  cy.visit("http://localhost:4200/editar-produto")
  cy.scrollTo(0, 800, {duration: 1000})  
  cy.wait(1000)
  cy.get('#pesquisar').type("CARNE DE")
  cy.scrollTo(0, 800, {duration: 1000})  
  cy.wait(1000)
})

it("VISITAR A PAGINA DE LISTA DE ENTRADAS", ()=>{
  cy.visit("http://localhost:4200/entrada-listar")
  cy.scrollTo(0, 800, {duration: 1000})
  cy.wait(1000)
  cy.get('#pesquisar').type("2020-12-03")
  cy.get('#search').click();
  cy.scrollTo(0, 800, {duration: 1000})
  cy.wait(1000)
})

it("VISITAR PAGINA DE LISTAR SAÍDAS", ()=>{
  cy.visit("http://localhost:4200/saida-listar")
  cy.scrollTo(0, 800, {duration: 1000})
  cy.wait(1000)
  cy.get('#pesquisar').type("2020-12-03")
  cy.get('#search').click();
  cy.scrollTo(0, 800, {duration: 1000})
  cy.wait(1000)
})





  
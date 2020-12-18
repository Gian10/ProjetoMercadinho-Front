
beforeEach(() => {
  cy.login()
})

it("VISITAR PAGINA DE CADASTRO DE USUÁRIO E CADASTRAR USUÁRIO", ()=>{
  cy.visit("http://localhost:4200/criar-conta")
  cy.get('[formcontrolname="nomeUsuario"]').type("usuario1");
  cy.get('[formcontrolname="senhaUsuario"]').type("123456");
  cy.get('.btn-primary').click();
  cy.wait(3000)
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
  cy.wait(1000)
})

it("VISITAR TELA DE PRODUTOS E PESQUISA", ()=>{
  cy.visit("http://localhost:4200/editar-produto")
  cy.scrollTo(0, 800, {duration: 1000})  
  cy.wait(1000)
  cy.get('#pesquisar').type("CARNE DE")
  cy.scrollTo(0, 800, {duration: 1000})  
  cy.wait(1000)
  cy.get('#pesquisar').clear()
  cy.wait(1000)
})

it("VISITAR PAGINA DE EDITAR PRODUTO", ()=>{
    cy.visit("http://localhost:4200/editar-produto/4")
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

it("VISITAR PAGINA DE USUÁRIO", ()=>{
  cy.visit(`http://localhost:4200/editar-usuario/${window.localStorage.getItem('idUser')}`)
  cy.scrollTo(0, 800, {duration: 1000})
})





  
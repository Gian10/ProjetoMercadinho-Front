describe("LOGIN", () => {
    it("MOSTRAR ACESSO DE LOGIN E LOGAR NO SISTEMA", () => {
      cy.visit("/login");
      cy.get('[formcontrolname="loginUsuario"]').type('GIAN');
      cy.get('[formcontrolname="loginSenha"]').type('123456')
      cy.get('.btn-primary').click();
    });
  });
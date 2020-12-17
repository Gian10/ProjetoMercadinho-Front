describe("First test", () => {
    it("should visit login page", () => {
      cy.visit("/login");
      cy.get('[formcontrolname="loginUsuario"]').type('GIAN');
      cy.get('[formcontrolname="loginSenha"]').type('123456')
      cy.get('.btn-primary').click();
    });
  });
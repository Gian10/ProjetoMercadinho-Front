Cypress.Commands.add('login', () => {
    cy.request("POST", "/login",{
          "nome": "GIAN",
          "senha": "123456",      
    })
      .its('body')
      .then((body) => {
       window.localStorage.setItem('idUser', body.id);
       window.localStorage.setItem('token', body.token);
       window.localStorage.setItem('nameUser', body.name);
      })
  });

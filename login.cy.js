describe('Login', () => {
    it('user can login', () => {
  
      //open login page
      cy.visit('http://localhost:3000/login');
  
      //1.Enter username ('liam' in this case)
      cy.findByPlaceholderText(/Username/i).type('liam');

      //2. Enter password('password123' in this case)
      cy.findByPlaceholderText(/password/i).type('password123');


      //cy.findByRole('presentation').check();
      Cypress.Commands.add("clickRecaptcha", () => {
        cy.window().then(win => {
          win.document
            .querySelector("iframe[src*='recaptcha']")
            .contentDocument.getElementById("recaptcha-token")
            .click();
        });
      });
  

      //3. Click Login button
      cy.findByRole('button', {  name: /log in/i}).click();
  
    });
  })
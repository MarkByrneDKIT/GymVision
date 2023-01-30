describe('Login', () => {
    it('user can login', () => {
  
      //open login page
      cy.visit('http://localhost:3000/login');
  
      //1.Enter username ('liam' in this case)
      cy.findByRole('textbox').type('liam');

      //2. Enter password('password123' in this case)
      cy.findByPlaceholderText(/enter password/i).type('password123');

      //3. Click Login button
      cy.findByRole('button', {  name: /log in/i}).click();
  
    });
  })
describe('history', () => {
    it('user can check history', () => {
  
      //open login page
      cy.visit('http://localhost:3000/history');
  
      //1.Enter username ('liam' in this case)
      cy.findByRole('button', {  name: /contained/i}).click();
  
    });
  })
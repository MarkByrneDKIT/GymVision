describe('Shoulderpress', () => {
    it('user can check shoulderPress data', () => {
  
      //open shoulderPress page
      cy.visit('http://localhost:3000/shoulderPress');
  
      //click on get data
      cy.findByRole('button', {  name: /get data/i}).click()
  
    });
  })
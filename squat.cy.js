describe('Squats', () => {
    it('user can check squats data', () => {
  
      //open squat page
      cy.visit('http://localhost:3000/squat');
  
      //click on get data
      cy.findByRole('button', {  name: /get data/i}).click()
  
    });
  })